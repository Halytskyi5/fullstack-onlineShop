package shop_api.app.dtos;


import java.util.List;

public class UserDto {
    private Long id;
    private String username;
    private String token;
    private List<CartItemDto> itemsInCart;

    public UserDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<CartItemDto> getItemsInCart() {
        return itemsInCart;
    }

    public void setItemsInCart(List<CartItemDto> itemsInCart) {
        this.itemsInCart = itemsInCart;
    }
}
