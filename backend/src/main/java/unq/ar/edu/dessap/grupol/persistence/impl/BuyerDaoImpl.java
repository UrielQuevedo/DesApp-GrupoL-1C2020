package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.persistence.BuyerDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.BuyerRepository;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.OptionalInt;

@Repository
public class BuyerDaoImpl implements BuyerDao {

    @Autowired
    private BuyerRepository buyerRepository;

    @Override
    public Buyer save(Buyer buyer) {
        return buyerRepository.save(buyer);
    }
        
    @Override
    public Buyer getBuyerById(long id) {
        Optional<Buyer> optionalBuyer = buyerRepository.findById(id);
        if (optionalBuyer.isPresent()) return optionalBuyer.get();
        throw new RuntimeException("No se encuentra el id");
    }

    @Override
    public Buyer getBuyerByEmail(String email) {
        Optional<Buyer> optionalBuyer = buyerRepository.findByEmail(email);
        if (optionalBuyer.isPresent()) return optionalBuyer.get();
        throw new RuntimeException("No coiciden los datos");
    }
}
