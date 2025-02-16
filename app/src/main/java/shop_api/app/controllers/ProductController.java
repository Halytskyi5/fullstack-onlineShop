package shop_api.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop_api.app.entities.ProductEntity;
import shop_api.app.services.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity addProducts(@RequestBody ProductEntity ... products) {
        try {
            return ResponseEntity.ok(this.productService.addProducts(products));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error in addProducts");
        }
    }

    @GetMapping
    public ResponseEntity getAllProducts() {
        try {
            return ResponseEntity.ok(this.productService.getAllProducts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error in getAllProducts");
        }
    }

    @GetMapping("{id}")
    public ResponseEntity getProduct(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(this.productService.getProduct(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error in getProduct");
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteProduct(@PathVariable("id") Long id) {
        try {
            this.productService.deleteProduct(id);
            return ResponseEntity.ok("Product was deleted!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error in deleteProduct");
        }
    }

}
