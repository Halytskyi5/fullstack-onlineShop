package shop_api.app.services;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import shop_api.app.dtos.RegisterDto;
import shop_api.app.dtos.UserDto;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.AppException;
import shop_api.app.exceptions.UserAlreadyExistException;
import shop_api.app.mappers.UserMapper;
import shop_api.app.repositories.UserRepository;

import java.nio.CharBuffer;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;

    public UserDto createUser(RegisterDto registerDto) {
        UserEntity user = this.userRepository.findByUsername(registerDto.username());
        if (user != null) {
            throw new AppException("User with this username already exist!", HttpStatus.BAD_REQUEST);
        }
        UserEntity userEntity = this.userMapper.toUser(registerDto);
        userEntity.setPassword(new String(registerDto.password()));
        return this.userMapper.toUserDto(this.userRepository.save(userEntity));
    }


    public List<UserEntity> getAllUsers() {
        return this.userRepository.findAll();
    }
    public UserEntity getUser(Long id) {
        return this.userRepository.findById(id).get();
    }

}
