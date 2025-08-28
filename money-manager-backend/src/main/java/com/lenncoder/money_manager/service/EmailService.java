package com.lenncoder.money_manager.service;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
}
