package shop_api.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop_api.app.entities.CartItemEntity;
import shop_api.app.entities.OrderEntity;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.CartEmptyException;
import shop_api.app.repositories.CartRepository;
import shop_api.app.repositories.OrderRepository;
import shop_api.app.repositories.UserRepository;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartRepository cartRepository;

    public List<OrderEntity> getAllOrders() {
        return this.orderRepository.findAll();
    }
    public OrderEntity addOrder(Long userId) throws CartEmptyException {
        UserEntity user = userRepository.findById(userId).get();
        OrderEntity order = new OrderEntity();
        order.setUser(user);
        OrderEntity savedOrder = this.orderRepository.save(order);
        List<CartItemEntity> cartItems = user.getItemsInCart();
        if (cartItems.isEmpty()) {
            throw new CartEmptyException("Cart is empty!");
        }
        for (CartItemEntity cartItem : cartItems) {
            cartItem.setOrder(savedOrder);
            cartItem.setUser(null);
            this.cartRepository.save(cartItem);
        }
        return this.orderRepository.save(savedOrder);
    }
}
