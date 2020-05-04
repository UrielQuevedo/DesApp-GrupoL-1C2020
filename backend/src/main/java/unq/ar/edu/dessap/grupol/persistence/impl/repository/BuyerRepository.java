package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Buyer;

import java.util.Optional;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long> {
    Optional<Buyer> findByEmail(String email);
}
