package com.lenncoder.money_manager.service;

import com.lenncoder.money_manager.dto.AuthDTO;
import com.lenncoder.money_manager.dto.ProfileDTO;

import java.util.Map;

public interface ProfileService {
    ProfileDTO registerProfile(ProfileDTO profileDTO);
    boolean activateProfile(String activationToken);
    boolean isAccountActive(String email);
    ProfileDTO getPublicProfile(String email);
    Map<String, Object> authenticationAndGenerateToken(AuthDTO authDTO);
}
