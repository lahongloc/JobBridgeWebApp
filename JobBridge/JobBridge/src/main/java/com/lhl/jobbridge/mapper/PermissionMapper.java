package com.lhl.jobbridge.mapper;

import com.lhl.jobbridge.dto.request.PermissionRequest;
import com.lhl.jobbridge.dto.response.PermissionResponse;
import com.lhl.jobbridge.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    PermissionResponse toPermissionResponse(Permission permission);

    Permission toPermission(PermissionRequest request);

//    List<PermissionResponse> toPermissionResponseList(List<Permission> permissionList);
}
