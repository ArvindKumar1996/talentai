package com.talentai.service;

import com.talentai.model.job.JobEnrichmentResponse;
import com.talentai.model.job.JobRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JobService {

    @Autowired
    private AzureOpenAIService azureOpenAIService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public JobEnrichmentResponse enrichJobDescription(JobRequest request) {
        // Prompt AI to return JSON with jobTitle, skills, and responsibilities
        String prompt = "Enrich the following job description and provide a JSON response with four fields:\n" +
                "1. jobTitle: concise title of the role\n" +
                "2. enrichedDescription: detailed enriched job description\n" +
                "3. skills: array of required skills\n" +
                "4. responsibilities: array of main responsibilities\n\n" +
                "Job Description:\n" + request.getJobDescription() +
                "\n\nRespond ONLY in valid JSON format.";

        String aiResponse = azureOpenAIService.getChatCompletion(prompt);

        JobEnrichmentResponse response;

        try {
            // Extract JSON if AI adds extra text
            String jsonOnly = aiResponse.substring(aiResponse.indexOf("{"), aiResponse.lastIndexOf("}") + 1);

            // Parse JSON into response object
            response = objectMapper.readValue(jsonOnly, JobEnrichmentResponse.class);

            // Ensure non-null lists
            if (response.getSkills() == null) response.setSkills(java.util.Collections.emptyList());
            if (response.getResponsibilities() == null) response.setResponsibilities(java.util.Collections.emptyList());
            if (response.getJobTitle() == null) response.setJobTitle("");
            if (response.getEnrichedDescription() == null) response.setEnrichedDescription("");

        } catch (Exception e) {
            // Fallback: return AI raw text in enrichedDescription
            response = new JobEnrichmentResponse();
            response.setJobTitle("");
            response.setEnrichedDescription(aiResponse);
            response.setSkills(java.util.Collections.emptyList());
            response.setResponsibilities(java.util.Collections.emptyList());
        }

        return response;
    }
}
