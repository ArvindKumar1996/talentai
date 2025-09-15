package com.talentai.util;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.talentai.model.offer.OfferRequest;

import java.io.ByteArrayOutputStream;

public class PdfGenerator {

    // Generate Offer Letter PDF with AI content
    public static byte[] generateOfferLetterPdf(OfferRequest request, String aiLetterContent) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            // Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLACK);
            Paragraph title = new Paragraph("Offer Letter", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            // Candidate Info
            Font infoFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.DARK_GRAY);
            document.add(new Paragraph("Candidate ID: " + request.getCandidateId(), infoFont));
            document.add(new Paragraph("Position: " + request.getPosition(), infoFont));
            document.add(new Paragraph("Salary: " + request.getSalary(), infoFont));
            document.add(Chunk.NEWLINE);

            // AI Letter Content
            Font bodyFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12, BaseColor.BLACK);
            document.add(new Paragraph(aiLetterContent, bodyFont));

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return ("Error generating PDF for candidateId: " + request.getCandidateId()).getBytes();
        }
    }

    // Placeholder for resume or other docs later
    public static byte[] generateResumePdf(String candidateId, String aiResumeContent) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLACK);
            Paragraph title = new Paragraph("Standardized Resume", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            Font bodyFont = FontFactory.getFont(FontFactory.TIMES_ROMAN, 12, BaseColor.BLACK);
            document.add(new Paragraph(aiResumeContent, bodyFont));

            document.close();
            return baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return ("Error generating Resume PDF for candidateId: " + candidateId).getBytes();
        }
    }
}
