package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.ProductOrder;

import java.util.Optional;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, Long> {

    @Query("SELECT po FROM ProductOrder po INNER JOIN Order o ON po.order.id = o.id AND " +
            "po.id = :productOrderId INNER JOIN ShoppingCart sc ON o.shoppingCart.id = sc.id AND sc.user.id = :userId")
    Optional<ProductOrder> findByProductOrderIdAndUserId(@Param("productOrderId") Long productOrderId,
                                                     @Param("userId") Long userId);
}
