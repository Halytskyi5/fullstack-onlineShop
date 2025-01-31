package shop_api.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import shop_api.app.entity.UserEntity;
import shop_api.app.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public UserEntity createUser(UserEntity user) {
        return this.userRepository.save(user);
    }
    public List<UserEntity> getAllUsers() {
        return this.userRepository.findAll();
    }
    public UserEntity getUser(Long id) {
        return this.userRepository.findById(id).get();
    }

}
