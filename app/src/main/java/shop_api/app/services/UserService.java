package shop_api.app.services;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import shop_api.app.dtos.CredentialsDto;
import shop_api.app.dtos.RegisterDto;
import shop_api.app.dtos.UserDto;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.AppException;
import shop_api.app.exceptions.UserAlreadyExistException;
import shop_api.app.mappers.UserMapper;
import shop_api.app.repositories.UserRepository;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;

    public UserDto register(RegisterDto registerDto) {
        /*Optional<UserEntity> user = this.userRepository.findByUsername(registerDto.username());
        if (user.isPresent()) {
            throw new AppException("User with this username already exist!", HttpStatus.BAD_REQUEST);
        }
        UserEntity userEntity = this.userMapper.toUser(registerDto);
        userEntity.setPassword(new String(registerDto.password()));
        return this.userMapper.toUserDto(this.userRepository.save(userEntity));*/ return null;
    }

    public UserDto login(CredentialsDto credentialsDto) {
        UserEntity user = this.userRepository.findByUsername(credentialsDto.username());
                //.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        if (true) {// check password
            return this.userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }


    public List<UserDto> getAllUsers() {
        List<UserDto> users = new ArrayList<>();
        for (UserEntity user : this.userRepository.findAll()) {
            users.add(this.userMapper.toUserDto(user));
        }
        return users;
    }


}
