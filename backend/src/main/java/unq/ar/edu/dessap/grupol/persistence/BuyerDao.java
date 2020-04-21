package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Buyer;

@Repository
public interface BuyerDao {
    Buyer save(Buyer buyer);
}
