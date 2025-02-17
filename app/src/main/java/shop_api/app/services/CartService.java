package shop_api.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import shop_api.app.dtos.CartItemDto;
import shop_api.app.entities.CartItemEntity;
import shop_api.app.entities.ProductEntity;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.AppException;
import shop_api.app.mappers.Mapper;
import shop_api.app.repositories.CartRepository;
import shop_api.app.repositories.ProductRepository;
import shop_api.app.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    public CartItemDto addItem(CartItemDto cartItemDto, Long userId) {
        CartItemEntity cartItemEntity = Mapper.toCartItem(cartItemDto);
        UserEntity user = this.userRepository.findById(userId)
                        .orElseThrow(() -> new AppException("Unknown user!", HttpStatus.NOT_FOUND));
        cartItemEntity.setUser(user);
        for(CartItemEntity cart : user.getItemsInCart()) {
            if(cart.getProductId().equals(cartItemEntity.getProductId())) {
                cart.setQuantity(cart.getQuantity() + cartItemEntity.getQuantity());
                CartItemEntity savedCart = this.countQuantityAndSaveCart(cart, cartItemEntity.getQuantity());
                return Mapper.toCartDto(savedCart);
            }
        }
        CartItemEntity savedCart = this.countQuantityAndSaveCart(cartItemEntity, cartItemEntity.getQuantity());
        return Mapper.toCartDto(savedCart);
    }
    private CartItemEntity countQuantityAndSaveCart(CartItemEntity cart, Integer quantity) {
        ProductEntity product = this.productRepository.findById(cart.getProductId())
                .orElseThrow(() -> new AppException("Unknown product!", HttpStatus.NOT_FOUND));
        Integer availableQuantity = product.getAvailableQuantity();
        if (availableQuantity < quantity) {
            throw new AppException("Not enough products! Available quantity: " + availableQuantity,
                    HttpStatus.BAD_REQUEST);
        }
        product.setAvailableQuantity(availableQuantity - quantity);
        this.productRepository.save(product);
        return this.cartRepository.save(cart);
    }

    public List<CartItemDto> getAllItems() {
        List<CartItemDto> cartItemDtos = new ArrayList<>();
        for(CartItemEntity item : this.cartRepository.findAll()) {
            cartItemDtos.add(Mapper.toCartDto(item));
        }
        return cartItemDtos;
    }

    public List<CartItemDto> getUserItems(Long userId) {
        List<CartItemDto> cartItemDtos = new ArrayList<>();
        UserEntity user = this.userRepository.findById(userId)
                .orElseThrow(() -> new AppException("Unknown user!", HttpStatus.NOT_FOUND));
        List<CartItemEntity> cartItemEntities = this.cartRepository.findAllByUser(user);
        if (cartItemEntities.isEmpty()) {
            return new ArrayList<CartItemDto>();
        }
        for (CartItemEntity item : cartItemEntities) {
            cartItemDtos.add(Mapper.toCartDto(item));
        }
        return cartItemDtos;
    }

    public void deleteItem(Long id) {
        this.cartRepository.deleteById(id);
    }

}
