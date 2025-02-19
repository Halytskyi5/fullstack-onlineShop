package shop_api.app.mappers;

import shop_api.app.dtos.CartItemDto;
import shop_api.app.dtos.RegisterDto;
import shop_api.app.dtos.UserDto;
import shop_api.app.entities.CartItemEntity;
import shop_api.app.entities.ProductEntity;
import shop_api.app.entities.UserEntity;

import java.util.ArrayList;
import java.util.List;

public class Mapper {
    public static UserDto toUserDto(UserEntity user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        List<CartItemDto> items = new ArrayList<>();
        for (CartItemEntity cartItem : user.getItemsInCart()) {
            items.add(Mapper.toCartDto(cartItem));
        }
        userDto.setItemsInCart(items);
        return userDto;
    }

    public static UserEntity toUser(RegisterDto registerDto) {
        UserEntity user = new UserEntity();
        user.setUsername(registerDto.username());
        return user;
    }

    public static CartItemEntity toCartItem(CartItemDto cartItemDto) {
        CartItemEntity cartItemEntity = new CartItemEntity();
        cartItemEntity.setProductId(cartItemDto.getProductId());
        cartItemEntity.setProductName(cartItemDto.getProductName());
        cartItemEntity.setQuantity(cartItemDto.getQuantity());
        cartItemEntity.setProductImage(cartItemDto.getProductImage());
        cartItemEntity.setProductPrice(cartItemDto.getProductPrice());
        return cartItemEntity;
    }
    public static CartItemDto toCartDto(CartItemEntity cartItemEntity) {
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setId(cartItemEntity.getId());
        cartItemDto.setProductId(cartItemEntity.getProductId());
        cartItemDto.setProductName(cartItemEntity.getProductName());
        cartItemDto.setQuantity(cartItemEntity.getQuantity());
        cartItemDto.setProductPrice(cartItemEntity.getProductPrice());
        cartItemDto.setProductImage(cartItemEntity.getProductImage());
        return cartItemDto;
    }
}
