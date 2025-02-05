package shop_api.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop_api.app.entity.CartItemEntity;
import shop_api.app.entity.OrderEntity;
import shop_api.app.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity getAllOrders() {
        try {
            return ResponseEntity.ok(this.orderService.getAllOrders());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in getAllOrders" + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity addOrder(@RequestBody OrderEntity order, @RequestParam("user_id") Long userId) {
        try {
            return ResponseEntity.ok(this.orderService.addOrder(order, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in addOrder" + e.getMessage());
        }
    }

}
