package com.talentai.util;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileStorageUtil {

    private static final String STORAGE_DIR = "uploads/";

    static {
        File dir = new File(STORAGE_DIR);
        if (!dir.exists()) dir.mkdirs();
    }

    // Save file physically
    public static String saveFile(MultipartFile file, String id) {
        try {
            String filePath = STORAGE_DIR + id + "_" + file.getOriginalFilename();
            FileOutputStream fos = new FileOutputStream(filePath);
            fos.write(file.getBytes());
            fos.close();
            return filePath;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // Read file content as text
    public static String readFileAsText(File file) {
        try {
            String name = file.getName().toLowerCase();
            if (name.endsWith(".pdf")) {
                PDDocument document = PDDocument.load(file);
                PDFTextStripper stripper = new PDFTextStripper();
                String text = stripper.getText(document);
                document.close();
                return text;
            } else if (name.endsWith(".docx")) {
                XWPFDocument doc = new XWPFDocument(new java.io.FileInputStream(file));
                XWPFWordExtractor extractor = new XWPFWordExtractor(doc);
                String text = extractor.getText();
                extractor.close();
                doc.close();
                return text;
            } else if (name.endsWith(".doc")) {
                HWPFDocument doc = new HWPFDocument(new java.io.FileInputStream(file));
                WordExtractor extractor = new WordExtractor(doc);
                String text = extractor.getText();
                extractor.close();
                doc.close();
                return text;
            } else if (name.endsWith(".txt")) {
                return new String(java.nio.file.Files.readAllBytes(file.toPath()));
            } else {
                return "Unsupported file type: " + file.getName();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "";
        }
    }
}
