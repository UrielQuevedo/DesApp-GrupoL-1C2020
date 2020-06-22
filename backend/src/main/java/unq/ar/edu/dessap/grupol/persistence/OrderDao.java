package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Order;

@Repository
public interface OrderDao {
    Order getOrderByIdAndByUserId(Long orderId, Long id);
    void deleteById(long id);
    void save(Order order);
}
