package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    Page<Store> getFilteredByNameAndPayment(String name, Payment payment, Pageable pageable);

    List<Store> getStoresFiltered(Sector category, String search, Payment payment);

    List<Store> getStoresThatHaveOffer(String search, Payment payment);
}
