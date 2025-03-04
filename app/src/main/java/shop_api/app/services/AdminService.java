package shop_api.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import shop_api.app.dtos.UserDto;
import shop_api.app.entities.ProductEntity;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.AppException;
import shop_api.app.mappers.Mapper;
import shop_api.app.repositories.ProductRepository;
import shop_api.app.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    public String welcome(Long id) throws AppException {
        if (this.authenticateAdmin(id)) {
            return "Hello ADMIN";
        }
        throw new AppException("Access denied!", HttpStatus.FORBIDDEN);
    }

    public List<UserDto> getUsers(Long id) {
        if (this.authenticateAdmin(id)) {
            List<UserDto> userDtos = new ArrayList<>();
            for(UserEntity user : this.userRepository.findAll()) {
                userDtos.add(Mapper.toUserDto(user));
            }
            return userDtos;
        }
        throw new AppException("Access denied!", HttpStatus.FORBIDDEN);
    }

    public List<ProductEntity> getProducts(Long id) {
        if (this.authenticateAdmin(id)) {
            List<ProductEntity> products = this.productRepository.findAll();
            return products;
        }
        throw new AppException("Access denied!", HttpStatus.FORBIDDEN);
    }

    public UserDto editRoles(UserDto userDto, Long id) {
        if (this.authenticateAdmin(id)) {
            UserEntity user = this.userRepository.findByUsername(userDto.getUsername())
                    .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
            user.setRoles(userDto.getRoles());
            UserEntity savedUser = this.userRepository.save(user);
            return Mapper.toUserDto(savedUser);
        }
        throw new AppException("Access denied!", HttpStatus.FORBIDDEN);
    }

    public ProductEntity editProduct(ProductEntity product, Long id) {
        if (this.authenticateAdmin(id)) {
            ProductEntity productEntity = this.productRepository.findById(product.getId())
                    .orElseThrow(() -> new AppException("Unknown product", HttpStatus.NOT_FOUND));
            ProductEntity savedProduct = this.productRepository.save(product);
            return savedProduct;
        }
        throw new AppException("Access denied!", HttpStatus.FORBIDDEN);
    }

    private Boolean authenticateAdmin(Long id) {
        UserEntity user = this.userRepository.findById(id)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        String[] roles = user.getRoles().split(" ");
        for(String role : roles) {
            if (role.equals("ADMIN")) {
                return true;
            }
        }
        return false;
    }
}
