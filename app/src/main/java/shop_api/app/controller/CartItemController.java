package shop_api.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop_api.app.entity.CartItemEntity;
import shop_api.app.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartItemController {
    @Autowired
    private CartService cartService;

    /*@PostMapping
    public ResponseEntity addItem(@RequestBody ProductEntity product, @RequestParam Integer quantity) {
        try {
            return ResponseEntity.ok(this.cartService.addItemToCart(product, quantity));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in addItem()");
        }
    }*/

    @PostMapping
    public ResponseEntity addItem(@RequestBody CartItemEntity cartItem, @RequestParam("user_id") Long userId) {
        try {
            return ResponseEntity.ok(this.cartService.addItem(cartItem, userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in addItem() " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity getAllItems() {
        try {
            return ResponseEntity.ok(this.cartService.getAllItems());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in getAllItems()");
        }
    }

    @GetMapping
    public ResponseEntity getUserItems(@RequestParam("user_id") Long id) {
        try {
            return ResponseEntity.ok(this.cartService.getUserItems(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in getUserItems()");
        }
    }

    @PutMapping("{id}") //// ??????
    public ResponseEntity updateCart(@PathVariable Long id, @RequestBody CartItemEntity cartItem) {
        try {
            return ResponseEntity.ok(this.cartService.updateCart(cartItem, id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in updateCart()");
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteItem(@PathVariable("id") Long id) {
        try {
            this.cartService.deleteItem(id);
            return ResponseEntity.ok("Item was deleted!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error in deleteProduct");
        }
    }
}
