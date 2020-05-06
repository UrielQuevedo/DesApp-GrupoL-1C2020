package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.model.Location;

@Service
public interface BuyerService {
    Buyer create(String username, String password, String email);
    Buyer getBuyerById(long id);
    Buyer getBuyerByEmailAndPassword(String email, String password);
    Buyer updateBuyerLocation(long id, Location location);
}
