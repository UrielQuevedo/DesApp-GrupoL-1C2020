package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.ProductOrder;
import unq.ar.edu.dessap.grupol.persistence.ProductOrderDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.ProductOrderRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductOrderDaoImpl implements ProductOrderDao {
    @Autowired
    ProductOrderRepository productOrderRepository;

    @Override
    public void deleteById(Long id) {
        productOrderRepository.deleteById(id);
    }

    public ProductOrder getProductOrderByIdAndByUserId(Long productOrderId, Long userId) {
        Optional<ProductOrder> productOrder = this.productOrderRepository.findByProductOrderIdAndUserId(productOrderId, userId);
        if (productOrder.isPresent()) return productOrder.get();
        throw new RuntimeException("No se encontro el producto en el carrito del usuario");
    }
}
