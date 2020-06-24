package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.persistence.OrderDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.OrderRepository;

import java.util.Optional;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    OrderRepository orderRepository;

    @Override
    public Order getOrderByIdAndByUserId(Long orderId, Long id) {
        Optional<Order> orderOptional = orderRepository.findByOrderIdAndUserId(orderId, id);
        if (orderOptional.isPresent()) return orderOptional.get();
        throw new RuntimeException("No se encontro la order del usuario");
    }

    @Override
    public void deleteById(long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public void save(Order order) {
        orderRepository.save(order);
    }
}
