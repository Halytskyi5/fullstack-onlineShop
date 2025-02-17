package shop_api.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import shop_api.app.config.UserAuthProvider;
import shop_api.app.dtos.CredentialsDto;
import shop_api.app.dtos.RegisterDto;
import shop_api.app.dtos.UserDto;
import shop_api.app.entities.UserEntity;
import shop_api.app.exceptions.AppException;
import shop_api.app.mappers.UserMapper;
import shop_api.app.repositories.UserRepository;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserAuthProvider userAuthProvider;


    public UserDto register(RegisterDto registerDto) {
        Optional<UserEntity> user = this.userRepository.findByUsername(registerDto.username());
        if (user.isPresent()) {
            throw new AppException("User with this username already exist!", HttpStatus.BAD_REQUEST);
        }
        UserEntity userEntity = UserMapper.toUser(registerDto);
        userEntity.setPassword(this.passwordEncoder.encode(CharBuffer.wrap(registerDto.password())));
        UserDto savedUser = UserMapper.toUserDto(this.userRepository.save(userEntity));
        savedUser.setToken(this.userAuthProvider.createToken(savedUser));
        return savedUser;
    }

    public UserDto login(CredentialsDto credentialsDto) {
        UserEntity user = this.userRepository.findByUsername(credentialsDto.username())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            UserDto userDto = UserMapper.toUserDto(user);
            userDto.setToken(this.userAuthProvider.createToken(userDto));
            return userDto;
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }


    public List<UserDto> getAllUsers() {
        List<UserDto> users = new ArrayList<>();
        for (UserEntity user : this.userRepository.findAll()) {
            users.add(UserMapper.toUserDto(user));
        }
        return users;
    }


}
