package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.persistence.BuyerDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.BuyerRepository;

@Repository
public class BuyerDaoImpl implements BuyerDao {

    @Autowired
    private BuyerRepository buyerRepository;

    @Override
    public Buyer save(Buyer buyer) {
        return buyerRepository.save(buyer);
    }
}
