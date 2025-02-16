package shop_api.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.UserAlreadyExistException;
import shop_api.app.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public UserEntity createUser(UserEntity user) throws UserAlreadyExistException {
        if (this.userRepository.findByUsername(user.getUsername()) != null) {
            throw new UserAlreadyExistException("User with this name already exist!");
        }
        return this.userRepository.save(user);
    }
    public List<UserEntity> getAllUsers() {
        return this.userRepository.findAll();
    }
    public UserEntity getUser(Long id) {
        return this.userRepository.findById(id).get();
    }

}
