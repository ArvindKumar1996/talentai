package com.talentai.controller;

import com.talentai.model.job.JobRequest;
import com.talentai.model.job.JobEnrichmentResponse;
import com.talentai.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/enrich")
    public JobEnrichmentResponse enrichJob(@RequestBody JobRequest request) {
        return jobService.enrichJobDescription(request);
    }
}
