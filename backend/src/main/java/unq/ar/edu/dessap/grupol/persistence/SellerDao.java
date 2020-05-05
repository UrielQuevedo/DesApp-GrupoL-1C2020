package unq.ar.edu.dessap.grupol.persistence;

import unq.ar.edu.dessap.grupol.model.Seller;

import java.util.Optional;

public interface SellerDao {

    void save(Seller seller);

    Optional<Seller> findById(Long id);
}
