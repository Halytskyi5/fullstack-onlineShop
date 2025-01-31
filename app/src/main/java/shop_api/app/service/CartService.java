package shop_api.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop_api.app.entity.CartItemEntity;
import shop_api.app.entity.ProductEntity;
import shop_api.app.repository.CartRepository;
import shop_api.app.repository.UserRepository;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private UserRepository userRepository;

    public CartItemEntity addItem(CartItemEntity cartItem, Long userId) {
        cartItem.setId(null);
        cartItem.setUser(userRepository.findById(userId).get());
        return this.cartRepository.save(cartItem);
    }
    public List<CartItemEntity> getAllItems() {
        return this.cartRepository.findAll();
    }

    public List<CartItemEntity> getUserItems(Long id) {
        return this.cartRepository.findAllByUser(userRepository.findById(id).get());
    }

    public void deleteItem(Long id) {
        this.cartRepository.deleteById(id);
    }

    public CartItemEntity updateCart(CartItemEntity cartItem, Long itemId) {
        CartItemEntity cart = this.cartRepository.findById(itemId).get();
        cart.setQuantity(cartItem.getQuantity());
        return this.cartRepository.save(cart);
    }
}
