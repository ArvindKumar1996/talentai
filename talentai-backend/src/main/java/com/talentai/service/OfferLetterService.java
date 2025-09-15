package com.talentai.service;

import com.talentai.model.offer.OfferRequest;
import com.talentai.model.offer.OfferResponse;
import com.talentai.util.PdfGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OfferLetterService {

    @Autowired
    private AzureOpenAIService azureOpenAIService;

    // Keep in-memory store for generated PDFs
    private final java.util.Map<String, byte[]> offerLetters = new java.util.concurrent.ConcurrentHashMap<>();

    public OfferResponse generateOfferLetter(OfferRequest request) {
        String aiPrompt = "Generate a personalized, professional offer letter for candidate ID: "
                + request.getCandidateId()
                + ". Include role: " + request.getPosition()
                + " and salary: " + request.getSalary();

        String aiLetter = azureOpenAIService.getChatCompletion(aiPrompt);

        // Generate PDF with AI content
        byte[] pdfBytes = PdfGenerator.generateOfferLetterPdf(request, aiLetter);
        offerLetters.put(request.getCandidateId(), pdfBytes);

        OfferResponse response = new OfferResponse();
        response.setCandidateId(request.getCandidateId());
        response.setStatus("Generated with AI & Saved");
        return response;
    }

    public byte[] downloadOfferLetter(String candidateId) {
        return offerLetters.getOrDefault(candidateId,
                ("No Offer Letter found for candidateId: " + candidateId).getBytes());
    }
}
