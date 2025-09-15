package com.talentai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.talentai.model.resume.*;
import com.talentai.util.PdfGenerator;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ResumeService {

    private final Map<String, CandidateProfile> candidateProfiles = new ConcurrentHashMap<>();

    @Autowired
    private AzureOpenAIService azureOpenAIService;

    // Upload resume file (TXT, PDF, DOC, DOCX)
    public ResumeUploadResponse uploadResume(MultipartFile file) {
        String id = UUID.randomUUID().toString();
        CandidateProfile profile = new CandidateProfile();
        profile.setCandidateId(id);
        profile.setFileName(file.getOriginalFilename());

        try {
            String text = extractTextFromFile(file);
            profile.setParsedText(text);

            // AI-powered auto-parsing
            autoParseResume(profile, text);

        } catch (Exception e) {
            e.printStackTrace();
        }

        candidateProfiles.put(id, profile);

        ResumeUploadResponse response = new ResumeUploadResponse();
        response.setCandidateId(id);
        response.setStatus("Resume uploaded and parsed successfully");
        return response;
    }

    // Extract text from supported file types
    private String extractTextFromFile(MultipartFile file) throws Exception {
        String text = "";
        String fileName = file.getOriginalFilename().toLowerCase();
        InputStream is = file.getInputStream();

        if (fileName.endsWith(".pdf")) {
            PDDocument document = PDDocument.load(is);
            text = new PDFTextStripper().getText(document);
            document.close();
        } else if (fileName.endsWith(".docx")) {
            XWPFDocument docx = new XWPFDocument(is);
            XWPFWordExtractor extractor = new XWPFWordExtractor(docx);
            text = extractor.getText();
            extractor.close();
            docx.close();
        } else if (fileName.endsWith(".doc")) {
            HWPFDocument doc = new HWPFDocument(is);
            WordExtractor extractor = new WordExtractor(doc);
            text = extractor.getText();
            extractor.close();
            doc.close();
        } else if (fileName.endsWith(".txt")) {
            text = new String(file.getBytes());
        } else {
            throw new IllegalArgumentException("Unsupported file format: " + fileName);
        }
        return text;
    }

    // Upload LinkedIn profile
    public ResumeUploadResponse uploadLinkedIn(LinkedInRequest request) {
        String id = UUID.randomUUID().toString();

        CandidateProfile profile = new CandidateProfile();
        profile.setCandidateId(id);
        profile.setFileName("LinkedInProfile");
        profile.setParsedText("LinkedIn URL: " + request.getProfileUrl());

        // AI-powered auto-parsing
        autoParseResume(profile, profile.getParsedText());

        candidateProfiles.put(id, profile);

        ResumeUploadResponse response = new ResumeUploadResponse();
        response.setCandidateId(id);
        response.setStatus("LinkedIn profile uploaded and parsed successfully");
        return response;
    }

    // AI-based candidate screening
    public ScreeningResponse screenCandidate(ScreeningRequest request) {
        CandidateProfile profile = candidateProfiles.get(request.getCandidateId());
        ScreeningResponse response = new ScreeningResponse();
        response.setCandidateId(request.getCandidateId());

        if (profile == null) {
            response.setFitScore(0.0);
            response.setSummary("Candidate not found");
            return response;
        }

        String prompt = "Given this candidate information: \n" +
                "Name: " + profile.getName() + "\n" +
                "Email: " + profile.getEmail() + "\n" +
                "Skills: " + profile.getSkills() + "\n" +
                "Experience: " + profile.getExperience() + "\n" +
                "Education: " + profile.getEducation() + "\n" +
                "Resume Text: " + profile.getParsedText() + "\n" +
                "And this job description: \n" + request.getJobDescription() +
                "\nEvaluate how well the candidate fits the job and provide:" +
                "\n1. Fit score between 0.0 and 1.0" +
                "\n2. Short summary\n" +
                "Respond ONLY in JSON format like: {\"fitScore\":0.85,\"summary\":\"Candidate is strong for this role\"}";

        try {
            String aiResponse = azureOpenAIService.getChatCompletion(prompt);
            if (aiResponse == null || aiResponse.isEmpty()) {
                response.setFitScore(0.0);
                response.setSummary("AI service returned no response");
                return response;
            }

            ObjectMapper mapper = new ObjectMapper();
            ScreeningResponse aiParsed = mapper.readValue(aiResponse, ScreeningResponse.class);

            double percentageScore = aiParsed.getFitScore() * 100;
            response.setFitScore(percentageScore);
            response.setSummary(aiParsed.getSummary());

        } catch (Exception e) {
            e.printStackTrace();
            response.setFitScore(0.0);
            response.setSummary("Could not evaluate candidate");
        }

        return response;
    }

    // Generate standardized resume text
    public String generateStandardizedResume(String candidateId) {
        CandidateProfile profile = candidateProfiles.get(candidateId);
        if (profile == null) return "Candidate not found";

        StringBuilder sb = new StringBuilder();
        sb.append("Candidate Name: ").append(profile.getName() != null ? profile.getName() : "N/A").append("\n");
        sb.append("Email: ").append(profile.getEmail() != null ? profile.getEmail() : "N/A").append("\n");
        sb.append("Skills: ").append(profile.getSkills() != null ? profile.getSkills() : "N/A").append("\n");
        sb.append("Experience: ").append(profile.getExperience() != null ? profile.getExperience() : "N/A").append("\n");
        sb.append("Education: ").append(profile.getEducation() != null ? profile.getEducation() : "N/A").append("\n");
        sb.append("Resume Text: ").append(profile.getParsedText() != null ? profile.getParsedText() : "N/A").append("\n");

        return sb.toString();
    }

    // --- Helper: AI-powered resume parsing ---
    private void autoParseResume(CandidateProfile profile, String rawText) {
        String prompt = "Extract structured information from the following resume text or LinkedIn URL:\n" +
                rawText + "\n" +
                "Return JSON with: {\"name\":\"\", \"email\":\"\", \"skills\":[...], \"experience\":\"\", \"education\":\"\"}";

        try {
            String aiResponse = azureOpenAIService.getChatCompletion(prompt);
            if (aiResponse != null && !aiResponse.isEmpty()) {
                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> parsed = mapper.readValue(aiResponse, Map.class);

                profile.setName(parsed.getOrDefault("name", "").toString());
                profile.setEmail(parsed.getOrDefault("email", "").toString());
                profile.setSkills((parsed.get("skills") != null) ? (java.util.List<String>) parsed.get("skills") : null);
                profile.setExperience(parsed.getOrDefault("experience", "").toString());
                profile.setEducation(parsed.getOrDefault("education", "").toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            // leave profile fields as null if parsing fails
        }
    }

    // Optional: Generate resume PDF using PdfGenerator
    public byte[] generateResumePdf(String candidateId) {
        CandidateProfile profile = candidateProfiles.get(candidateId);
        if (profile == null) return ("Candidate not found").getBytes();
        return PdfGenerator.generateResumePdf(candidateId, generateStandardizedResume(candidateId));
    }
}
