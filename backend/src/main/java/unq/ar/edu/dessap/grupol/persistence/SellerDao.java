package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Seller;

import java.util.Optional;

@Repository
public interface SellerDao {

    void save(Seller seller);

    Optional<Seller> findById(Long id);
}
