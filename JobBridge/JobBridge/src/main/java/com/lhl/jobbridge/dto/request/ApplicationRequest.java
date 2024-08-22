package com.lhl.jobbridge.dto.request;

import com.lhl.jobbridge.entity.CurriculumVitae;
import com.lhl.jobbridge.entity.JobPost;
import jakarta.persistence.ManyToOne;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicationRequest {
    String coverLetter;
    String hotline;
    String email;
    String curriculumVitae;
    String jobPost;
    MultipartFile curriculumVitaeFile;
}
