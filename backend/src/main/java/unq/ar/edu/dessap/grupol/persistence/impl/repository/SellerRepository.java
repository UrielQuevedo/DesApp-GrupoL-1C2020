package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    Seller findByUsername(String username);

    Seller findByEmail(String email);
}
