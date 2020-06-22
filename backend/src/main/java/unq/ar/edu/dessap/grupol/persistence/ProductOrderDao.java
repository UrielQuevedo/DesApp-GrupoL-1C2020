package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.ProductOrder;

@Repository
public interface ProductOrderDao {
    void deleteById(Long id);
    ProductOrder getProductOrderByIdAndByUserId(Long productOrderId, Long userId);
}
