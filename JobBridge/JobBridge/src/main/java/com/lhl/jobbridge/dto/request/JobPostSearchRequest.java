package com.lhl.jobbridge.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobPostSearchRequest {
    String jobTitle;
    String salaryRange;
    String workType;
    String jobLocation;
    String jobField;
    Integer pageNumber;
}
