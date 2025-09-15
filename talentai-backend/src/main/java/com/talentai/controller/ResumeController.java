package com.talentai.controller;

import com.talentai.model.resume.*;
import com.talentai.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResumeUploadResponse uploadResume(@RequestParam("file") MultipartFile file) {
        return resumeService.uploadResume(file);
    }

    @PostMapping("/linkedin")
    public ResumeUploadResponse uploadLinkedIn(@RequestBody LinkedInRequest request) {
        return resumeService.uploadLinkedIn(request);
    }

    @PostMapping("/screen")
    public ScreeningResponse screenCandidate(@RequestBody ScreeningRequest request) {
        return resumeService.screenCandidate(request);
    }

    @GetMapping("/standardize/{candidateId}")
    public String generateStandardizedResume(@PathVariable String candidateId) {
        return resumeService.generateStandardizedResume(candidateId);
    }
}
