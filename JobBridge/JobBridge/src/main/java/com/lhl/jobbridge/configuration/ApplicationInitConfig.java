package com.lhl.jobbridge.configuration;

import com.lhl.jobbridge.entity.User;
import com.lhl.jobbridge.entity.Role;
//import com.lhl.jobbridge.enums.Role;
import com.lhl.jobbridge.repository.RoleRepository;
import com.lhl.jobbridge.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    RoleRepository roleRepository;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            Role adminRole = Role.builder().name("ADMIN").description("admin role").build();
            Role applicantRole = Role.builder().name("APPLICANT").description("applicant role").build();
            Role recruiterRole = Role.builder().name("RECRUITER").description("recruiter role").build();
            this.roleRepository.saveAll(List.of(adminRole, applicantRole, recruiterRole));

            var roles = new HashSet<Role>();
            roles.add(adminRole);
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
                User user = User.builder()
                        .email("admin@gmail.com")
                        .password(this.passwordEncoder.encode("admin"))
                        .roles(roles)
                        .build();

                this.userRepository.save(user);
                log.warn("admin user has been created with default password: admin, please change it!");
            }
        };
    }
}
