package com.talentai.controller;

import com.talentai.model.preoffer.*;
import com.talentai.service.PreOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/preoffer")
public class PreOfferController {

    @Autowired
    private PreOfferService preOfferService;

    @PostMapping("/send")
    public PreOfferResponse sendPreOffer(@RequestBody PreOfferRequest request) {
        return preOfferService.sendPreOfferMessage(request);
    }

    @GetMapping("/track/{candidateId}")
    public TrackingResponse track(@PathVariable String candidateId) {
        return preOfferService.trackCandidate(candidateId);
    }
}
