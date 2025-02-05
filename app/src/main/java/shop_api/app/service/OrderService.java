package shop_api.app.service;

import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop_api.app.entity.CartItemEntity;
import shop_api.app.entity.OrderEntity;
import shop_api.app.entity.UserEntity;
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
    public OrderEntity addOrder(OrderEntity order, Long userId) {
        UserEntity user = userRepository.findById(userId).get();
        order.setUser(user);
        OrderEntity savedOrder = this.orderRepository.save(order);
        for (CartItemEntity cartItem : user.getItemsInCart()) {
            cartItem.setOrder(savedOrder);
            cartItem.setUser(null);
            this.cartRepository.save(cartItem);
        }
        return this.orderRepository.save(savedOrder);
    }
}
