package shop_api.app.service;

import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop_api.app.entity.CartItemEntity;
import shop_api.app.entity.OrderEntity;
import shop_api.app.entity.UserEntity;
import shop_api.app.exception.CartEmptyException;
import shop_api.app.repository.CartRepository;
import shop_api.app.repository.OrderRepository;
import shop_api.app.repository.UserRepository;

import java.util.ArrayList;
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
