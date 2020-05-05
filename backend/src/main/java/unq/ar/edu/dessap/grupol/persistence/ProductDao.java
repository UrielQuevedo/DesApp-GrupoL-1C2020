package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Product;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDao {
    
    void save(Product product);

    List<Product> getAllByIdStore(Long idStore);

    Optional<Product> findById(Long id);

    void deleteById(Long id);
}
