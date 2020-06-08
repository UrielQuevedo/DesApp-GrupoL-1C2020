package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import unq.ar.edu.dessap.grupol.model.*;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select s.products " +
            "from Store s " +
            "where s.id = ?1")
    List<Product> findAllByIdStore(Long id);

    @Query("SELECT DISTINCT p.category FROM Store s INNER JOIN Product p ON p.store.id = :store_id AND s.id = :store_id")
    List<Category> getProductsCategories(@Param("store_id") Long store_id);

    @Query("SELECT p FROM Product p INNER JOIN Store s ON p.store.id = :store_id AND s.id = :store_id " +
            "AND lower(p.name) LIKE lower(concat('%',:search,'%')) " +
            "AND :category = p.category ")
    Page<Product> getProductsByStoreIdAndProductNameAndCategory(@Param("store_id") Long store_id,
                                                                @Param("search") String search,
                                                                @Param("category") Category category,
                                                                Pageable pageable);

}
