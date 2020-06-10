package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Category;
import unq.ar.edu.dessap.grupol.model.Product;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDao {
    
    void save(Product product);

    List<Product> getAllByIdStore(Long idStore);

    Optional<Product> findById(Long id);

    void deleteById(Long id);

    Page<Product> getProductsFiltered(Long idStore, Category category, String search, Pageable pageable);
}
