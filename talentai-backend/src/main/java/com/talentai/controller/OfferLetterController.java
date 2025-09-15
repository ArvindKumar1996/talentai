package com.talentai.controller;

import com.talentai.model.offer.OfferRequest;
import com.talentai.model.offer.OfferResponse;
import com.talentai.service.OfferLetterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.ByteArrayResource;

@RestController
@RequestMapping("/api/offer")
public class OfferLetterController {

    @Autowired
    private OfferLetterService offerLetterService;

    @PostMapping("/generate")
    public OfferResponse generateOffer(@RequestBody OfferRequest request) {
        return offerLetterService.generateOfferLetter(request);
    }

    @GetMapping("/download/{candidateId}")
    public ResponseEntity<ByteArrayResource> downloadOffer(@PathVariable String candidateId) {
        byte[] data = offerLetterService.downloadOfferLetter(candidateId);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment;filename=offer_" + candidateId + ".pdf")
                .contentLength(data.length)
                .body(resource);
    }
}
