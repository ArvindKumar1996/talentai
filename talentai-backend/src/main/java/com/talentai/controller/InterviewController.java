package com.talentai.controller;

import com.talentai.model.interview.*;
import com.talentai.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping("/schedule")
    public InterviewResponse schedule(@RequestBody InterviewRequest request) {
        return interviewService.scheduleInterview(request);
    }

    @PostMapping("/feedback")
    public CandidateFeedback submitFeedback(@RequestBody FeedbackRequest request) {
        return interviewService.submitFeedback(request);
    }
}
