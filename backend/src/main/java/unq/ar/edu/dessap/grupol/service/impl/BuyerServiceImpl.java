package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.persistence.BuyerDao;
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

    @Override
    @Transactional
    public Buyer getBuyerById(long id) {
        return buyerDao.getBuyerById(id);
    }

    @Override
    @Transactional
    public Buyer getBuyerByEmailAndPassword(String email, String password) {
        Buyer buyer = buyerDao.getBuyerByEmail(email);
        if (passwordEncoder.matches(password, buyer.getPassword())) {
            return buyer;
        }
        throw new RuntimeException("No coiciden los datos");
    }
}
