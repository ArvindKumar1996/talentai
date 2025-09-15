package com.talentai.util;

import com.talentai.service.AzureOpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
public class CalendarIntegration {

    private static AzureOpenAIService azureOpenAIService;

    @Autowired
    public CalendarIntegration(AzureOpenAIService service) {
        azureOpenAIService = service;
    }

    public static boolean scheduleInterview(String candidateEmail, String interviewerEmail,
                                            LocalDateTime startTime, LocalDateTime endTime,
                                            String subject, String description) {
        System.out.println("Scheduling interview for: " + candidateEmail);
        System.out.println("Interviewer: " + interviewerEmail);
        System.out.println("Time: " + startTime + " to " + endTime);
        System.out.println("Subject: " + subject);
        System.out.println("Description: " + description);
        return true;
    }

    public static boolean cancelInterview(String eventId) {
        System.out.println("Cancelling interview with Event ID: " + eventId);
        return true;
    }

    public static List<LocalDateTime[]> suggestInterviewSlots(
            List<LocalDateTime[]> candidateAvailableTimes,
            List<LocalDateTime[]> interviewerAvailableTimes) {

        List<LocalDateTime[]> suggestedSlots = new ArrayList<>();
        if (candidateAvailableTimes.isEmpty() || interviewerAvailableTimes.isEmpty()) {
            return suggestedSlots;
        }

        // Convert time slots to string for prompt
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        StringBuilder candidateTimes = new StringBuilder();
        for (LocalDateTime[] slot : candidateAvailableTimes) {
            candidateTimes.append(slot[0].format(formatter))
                    .append(" to ")
                    .append(slot[1].format(formatter))
                    .append(", ");
        }

        StringBuilder interviewerTimes = new StringBuilder();
        for (LocalDateTime[] slot : interviewerAvailableTimes) {
            interviewerTimes.append(slot[0].format(formatter))
                    .append(" to ")
                    .append(slot[1].format(formatter))
                    .append(", ");
        }

        // AI prompt
        String prompt = "You are an AI assistant for scheduling interviews. "
                + "Candidate available times: " + candidateTimes.toString() + "\n"
                + "Interviewer available times: " + interviewerTimes.toString() + "\n"
                + "Suggest 3 optimal overlapping time slots (start and end) for the interview. "
                + "Return only in JSON format: [{\"start\":\"yyyy-MM-dd HH:mm\", \"end\":\"yyyy-MM-dd HH:mm\"}, ...]";

        String aiResponse = azureOpenAIService.getChatCompletion(prompt);

        try {
            // Parse JSON into LocalDateTime[]
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            List<?> slots = mapper.readValue(aiResponse, List.class);
            for (Object obj : slots) {
                java.util.Map<?, ?> slotMap = (java.util.Map<?, ?>) obj;
                LocalDateTime start = LocalDateTime.parse((String) slotMap.get("start"), formatter);
                LocalDateTime end = LocalDateTime.parse((String) slotMap.get("end"), formatter);
                suggestedSlots.add(new LocalDateTime[]{start, end});
            }
        } catch (Exception e) {
            System.out.println("Error parsing AI response: " + aiResponse);
        }

        return suggestedSlots;
    }
}
