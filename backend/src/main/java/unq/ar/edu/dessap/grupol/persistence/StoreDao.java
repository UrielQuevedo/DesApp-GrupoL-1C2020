package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Payment;
import unq.ar.edu.dessap.grupol.model.Sector;
import unq.ar.edu.dessap.grupol.model.Store;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreDao {

    Store findByLatitudeAndLongitude(Double latitude, Double longitude);

    void save(Store store);

    List<Store> getAll();

    Optional<Store> findById(Long id);

    List<Store> getFilteredByName(String name);

    List<Store> getStoresFiltered(Sector category, String search, Payment payment);
}
