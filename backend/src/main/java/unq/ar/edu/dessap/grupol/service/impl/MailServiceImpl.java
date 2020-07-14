package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.service.MailService;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    @Async("threadPoolTaskExecutor")
    public void sendDeliveryInfo(String to, String content, String storeName) {
        this.sendEmail(to,"El pedido llegara aproximadamente a las " + content, storeName);
    }

    @Override
    @Async("threadPoolTaskExecutor")
    public void sendTurnInfo(String to, String content, String storeName) {
        this.sendEmail(to, "El pedido lo tiene que ir a buscar a las " + content, storeName);
    }

    private void sendEmail(String to, String content, String storeName) {
        SimpleMailMessage email = new SimpleMailMessage();

        email.setTo(to);
        email.setSubject("Pedido en " + storeName);
        email.setText(content);

        mailSender.send(email);
    }
}
