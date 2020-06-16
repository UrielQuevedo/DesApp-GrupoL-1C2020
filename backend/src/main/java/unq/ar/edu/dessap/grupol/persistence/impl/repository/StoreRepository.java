package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.*;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long>  {

    @Query("select s " +
            "from Store s " +
            "where (s.location.latitude = ?1) " +
            "and (s.location.longitude = ?2)")
    Store findByLatitudeAndLongitude(Double latitude, Double longitude);

    @Query("SELECT DISTINCT s FROM Store s LEFT JOIN s.products p " +
            "WHERE (lower(s.name) like lower(concat('%',:name,'%')) OR lower(p.name) like lower(concat('%',:name,'%'))) " +
            "AND (:payment IS NULL OR :payment MEMBER s.payments) ")
    Page<Store> getStoresFindByNameOrProductsNameAndPayment(@Param("name") String name,
                                                            @Param("payment") Payment payment,
                                                            Pageable pageable);

    @Query("SELECT s FROM Store s WHERE :sector IS NULL OR s.sector = :sector " +
            "AND lower(s.name) LIKE lower(concat('%',:search,'%')) " +
            "AND (:payment IS NULL OR :payment MEMBER s.payments)")
    Page<Store> getStoresFindByNameAndSectorAndFilter(@Param("sector") Sector sector,
                                                      @Param("search") String search,
                                                      @Param("payment") Payment payment,
                                                      Pageable pageable);

    @Query("SELECT s FROM Store s LEFT JOIN s.products p WHERE p.offerToApply IS NOT NULL " +
            "AND lower(s.name) LIKE lower(concat('%',:search,'%')) " +
            "AND (:payment IS NULL OR :payment MEMBER s.payments)")
    Page<Store> getStoresThatHaveOffer(@Param("search") String search,
                                       @Param("payment") Payment payment,
                                       Pageable pageable);

    @Query("SELECT DISTINCT p.category FROM Store s INNER JOIN Product p ON p.store.id = :store_id AND s.id = :store_id")
    List<Category> getProductsCategories(@Param("store_id") Long store_id);
}
