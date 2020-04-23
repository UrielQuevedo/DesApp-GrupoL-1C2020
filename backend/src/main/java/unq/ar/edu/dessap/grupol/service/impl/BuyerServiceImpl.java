package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.persistence.BuyerDao;
import unq.ar.edu.dessap.grupol.persistence.impl.BuyerDaoImpl;
import unq.ar.edu.dessap.grupol.service.BuyerService;
import unq.ar.edu.dessap.grupol.service.builder.BuyerBuilder;

@Service
public class BuyerServiceImpl implements BuyerService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private BuyerDao buyerDao;

    @Override
    @Transactional
    public Buyer create(String _username, String _password, String _email) {
        Buyer buyer = BuyerBuilder.aBuyer()
                        .withEmail(_email)
                        .withPassword(passwordEncoder.encode(_password))
                        .withUsername(_username)
                        .build();

        return buyerDao.save(buyer);
    }
}