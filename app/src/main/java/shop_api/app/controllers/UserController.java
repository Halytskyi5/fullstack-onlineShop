package shop_api.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.UserAlreadyExistException;
import shop_api.app.services.UserService;


@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity createUser(@RequestBody UserEntity user) {
        try {
            return ResponseEntity.ok(this.userService.createUser(user));
        } catch (UserAlreadyExistException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error is exist!");
        }
    }
    @GetMapping("/all")
    public ResponseEntity getAllUsers() {
        try {
            return ResponseEntity.ok(this.userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in getAllUsers()");
        }
    }

    @GetMapping("{id}")
    public ResponseEntity getUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(this.userService.getUser(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("error in getUser()");
        }
    }
}
