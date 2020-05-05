package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Seller;
import unq.ar.edu.dessap.grupol.persistence.SellerDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.BuyerRepository;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.SellerRepository;

@Repository
public class SellerDaoImpl implements SellerDao {

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public void save(Seller seller) {
        sellerRepository.save(seller);
    }
}
