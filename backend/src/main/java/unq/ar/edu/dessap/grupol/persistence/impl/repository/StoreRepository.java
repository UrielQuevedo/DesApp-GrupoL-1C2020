package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Store;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long>  {
}
