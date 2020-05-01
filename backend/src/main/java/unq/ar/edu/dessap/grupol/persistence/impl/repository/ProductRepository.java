package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import unq.ar.edu.dessap.grupol.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
