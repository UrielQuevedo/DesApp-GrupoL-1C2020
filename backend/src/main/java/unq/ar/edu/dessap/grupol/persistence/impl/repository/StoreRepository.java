package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.Store;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long>  {

    @Query("select s " +
            "from Store s " +
            "where (s.location.latitude = ?1) " +
            "and (s.location.longitude = ?2)")
    Store findByLatitudeAndLongitude(Double latitude, Double longitude);

}
