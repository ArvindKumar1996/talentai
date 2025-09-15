package com.talentai.service;

import com.talentai.model.interview.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

    @Autowired
    private AzureOpenAIService azureOpenAIService;

    // Schedule interview
    public InterviewResponse scheduleInterview(InterviewRequest request) {
        InterviewResponse response = new InterviewResponse();
        response.setCandidateId(request.getCandidateId());

        // AI-generated note for scheduling
        String aiPrompt = "Create a professional interview schedule note for candidate ID: "
                + request.getCandidateId()
                + ", Panel: " + request.getPanel()
                + ", DateTime: " + request.getDateTime();
        String aiNote = azureOpenAIService.getChatCompletion(aiPrompt);

        response.setStatus("Scheduled - AI Note: " + aiNote);
        return response;
    }

    // Submit interview feedback
    public CandidateFeedback submitFeedback(FeedbackRequest request) {
        CandidateFeedback feedback = new CandidateFeedback();
        feedback.setCandidateId(request.getCandidateId());
        feedback.setFeedback(request.getFeedback());
        feedback.setRating(request.getRating());

        // AI-generated summary of feedback
        String aiPrompt = "Summarize this interview feedback for candidate ID: "
                + request.getCandidateId() + ": " + request.getFeedback();
        String aiSummary = azureOpenAIService.getChatCompletion(aiPrompt);
        feedback.setFeedback(feedback.getFeedback() + " | AI Summary: " + aiSummary);

        return feedback;
    }
}
