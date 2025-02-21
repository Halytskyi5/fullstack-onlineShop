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
