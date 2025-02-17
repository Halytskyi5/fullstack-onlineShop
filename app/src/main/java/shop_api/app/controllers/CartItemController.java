package shop_api.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop_api.app.dtos.CartItemDto;
import shop_api.app.entities.CartItemEntity;
import shop_api.app.entities.ProductEntity;
import shop_api.app.services.CartService;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartItemController {
    @Autowired
    private CartService cartService;


    @PostMapping
    public ResponseEntity<CartItemDto> addItem(@RequestBody CartItemDto cartItem, @RequestParam("user_id") Long userId) {
        return ResponseEntity.ok(this.cartService.addItem(cartItem, userId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CartItemDto>> getAllItems() {
        return ResponseEntity.ok(this.cartService.getAllItems());
    }

    @GetMapping
    public ResponseEntity<List<CartItemDto>> getUserItems(@RequestParam("user_id") Long id) {
        return ResponseEntity.ok(this.cartService.getUserItems(id));
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteItem(@PathVariable("id") Long id) {
        this.cartService.deleteItem(id);
        return ResponseEntity.ok("Item was deleted!");
    }
}
