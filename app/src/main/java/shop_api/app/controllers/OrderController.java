package shop_api.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop_api.app.exceptions.CartEmptyException;
import shop_api.app.services.OrderService;

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
    public ResponseEntity addOrder(@RequestParam("user_id") Long userId) {
        try {
            this.orderService.addOrder(userId);
            return ResponseEntity.ok("Order was saved!");
        } catch (CartEmptyException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in addOrder" + e.getMessage());
        }
    }

}
