package com.lhl.jobbridge.service;

import com.lhl.jobbridge.dto.request.RoleRequest;
import com.lhl.jobbridge.dto.response.RoleResponse;
import com.lhl.jobbridge.entity.Permission;
import com.lhl.jobbridge.mapper.PermissionMapper;
import com.lhl.jobbridge.mapper.RoleMapper;
import com.lhl.jobbridge.repository.PermissionRepository;
import com.lhl.jobbridge.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;
    PermissionMapper permissionMapper;

    public RoleResponse createRole(RoleRequest request) {
        var role = this.roleMapper.toRole(request);

        List<Permission> permissionList = this.permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissionList));
        this.roleRepository.save(role);

        return this.roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public void deleteRole(String name) {
        this.roleRepository.deleteById(name);
    }
}
