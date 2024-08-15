package com.lhl.jobbridge.mapper;

import com.lhl.jobbridge.dto.request.RoleRequest;
import com.lhl.jobbridge.dto.response.RoleResponse;
import com.lhl.jobbridge.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    RoleResponse toRoleResponse(Role role);

    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);
}
