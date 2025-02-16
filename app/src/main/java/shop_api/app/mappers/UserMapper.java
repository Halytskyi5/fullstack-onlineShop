package shop_api.app.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import shop_api.app.dtos.RegisterDto;
import shop_api.app.dtos.UserDto;
import shop_api.app.entities.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(UserEntity user);

    @Mapping(source = "password", target = "password", ignore = true)
    UserEntity toUser(RegisterDto registerDto);
}
