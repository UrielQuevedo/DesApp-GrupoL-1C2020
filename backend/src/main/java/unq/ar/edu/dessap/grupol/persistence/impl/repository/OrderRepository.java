package unq.ar.edu.dessap.grupol.persistence.impl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Order;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o INNER JOIN ShoppingCart sc ON o.shoppingCart.id = sc.id AND o.id = :orderId " +
            "INNER JOIN User u ON u.id = sc.user.id AND u.id = :userId")
    Optional<Order> findByOrderIdAndUserId(@Param("orderId") Long orderId,
                                      @Param("userId") Long userId);
}
