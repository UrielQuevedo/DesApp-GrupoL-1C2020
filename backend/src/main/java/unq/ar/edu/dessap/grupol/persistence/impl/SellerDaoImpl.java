package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Seller;
import unq.ar.edu.dessap.grupol.persistence.SellerDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.BuyerRepository;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.SellerRepository;

import java.util.Optional;

@Repository
public class SellerDaoImpl implements SellerDao {

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public void save(Seller seller) {
        sellerRepository.save(seller);
    }

    @Override
    public Optional<Seller> findById(Long id) {
        return sellerRepository.findById(id);
    }
}
