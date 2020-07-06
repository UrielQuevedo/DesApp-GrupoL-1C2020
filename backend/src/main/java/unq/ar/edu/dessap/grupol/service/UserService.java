package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.EditUserDto;
import unq.ar.edu.dessap.grupol.controller.dtos.LoginUserDto;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.OrderHistory;
import unq.ar.edu.dessap.grupol.model.ShoppingCart;
import unq.ar.edu.dessap.grupol.model.User;

import java.util.List;

@Service
public interface UserService {
    User create(String username, String password, String email);
    User getUserById(long id);
    User getUserByEmailAndPassword(String email, String password);
    List<OrderHistory> getUserOrdersById(long id);
    User updateUserLocation(long id, Location location);
    User editUser(EditUserDto userData);
}
