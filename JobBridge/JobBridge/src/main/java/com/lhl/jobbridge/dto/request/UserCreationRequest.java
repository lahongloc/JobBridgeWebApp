package com.lhl.jobbridge.dto.request;

import com.lhl.jobbridge.validator.DobConstraint;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    String fullname;
    @Size(min = 8, message = "PASSWORD_INVALID")
    String password;
    String email;
    Boolean gender;
    MultipartFile avatar;
    String companyName;
    @DobConstraint(min = 18, message = "INVALID_DOB")
    LocalDate dob;
}
