package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;

@Service
public interface MailService{
    void sendDeliveryInfo(String to, String content, String storeName);

    void sendTurnInfo(String email, String time, String name);
}
