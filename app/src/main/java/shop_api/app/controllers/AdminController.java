package shop_api.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop_api.app.dtos.UserDto;
import shop_api.app.entities.ProductEntity;
import shop_api.app.services.AdminService;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService service;

    @GetMapping("/welcome")
    public ResponseEntity<String> hello(@RequestParam("admin_id") Long id) {
        return ResponseEntity.ok(this.service.welcome(id));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getUsers(@RequestParam("admin_id") Long id) {
        return ResponseEntity.ok(this.service.getUsers(id));
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductEntity>> getProducts(@RequestParam("admin_id") Long id) {
        return ResponseEntity.ok(this.service.getProducts(id));
    }

    @PutMapping("/edit-user")
    public ResponseEntity<UserDto> editRoles(@RequestParam("admin_id") Long id, @RequestBody UserDto user) {
        return ResponseEntity.ok(this.service.editRoles(user, id));
    }

    @PutMapping("/edit-product")
    public ResponseEntity<ProductEntity> editProduct(@RequestParam("admin_id") Long id, @RequestBody ProductEntity product) {
        return ResponseEntity.ok(this.service.editProduct(product, id));
    }

}
