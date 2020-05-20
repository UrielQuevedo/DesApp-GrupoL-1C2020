package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.model.User;

import java.util.List;

@Service
public interface UserService {
    User create(String username, String password, String email);
    User getUserById(long id);
    User getUserByEmailAndPassword(String email, String password);
    List<Order> getUserOrdersById(long id);
    User updateUserLocation(long id, Location location);
}