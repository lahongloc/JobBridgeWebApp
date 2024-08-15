package com.lhl.jobbridge.mapper;

import com.lhl.jobbridge.dto.request.UserCreationRequest;
import com.lhl.jobbridge.dto.request.UserUpdateRequest;
import com.lhl.jobbridge.dto.response.UserResponse;
import com.lhl.jobbridge.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "fullname", target = "fullname")
    User toUser(UserCreationRequest request);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);

    @Mapping(source = "fullname", target = "fullname")
    UserResponse toUserResponse(User user);

}
