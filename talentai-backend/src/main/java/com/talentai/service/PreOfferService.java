package com.talentai.service;

import com.talentai.model.preoffer.*;
import org.springframework.stereotype.Service;

@Service
public class PreOfferService {

    public PreOfferResponse sendPreOfferMessage(PreOfferRequest request) {
        PreOfferResponse response = new PreOfferResponse();
        response.setCandidateId(request.getCandidateId());
        response.setStatus("Sent");
        return response;
    }

    public TrackingResponse trackCandidate(String candidateId) {
        TrackingResponse response = new TrackingResponse();
        response.setCandidateId(candidateId);
        response.setOpened(true);
        response.setClicked(false);
        return response;
    }
}
