package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.exception.LoginException;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.OrderHistory;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.persistence.UserDao;
import unq.ar.edu.dessap.grupol.service.UserService;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Override
    public User create(String _username, String _password, String _email) {
        User user = User.builder()
                .email(_email)
                .password(passwordEncoder.encode(_password))
                .username(_username)
                .build();

        return userDao.save(user);
    }

    @Override
    public User getUserById(long id) {
        return userDao.getUserById(id);
    }

    @Override
    public User getUserByEmailAndPassword(String email, String password) {
        User user = userDao.getUserByEmail(email);
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        throw new LoginException();
    }

    @Override
    public List<OrderHistory> getUserOrdersById(long id) {
        User user = userDao.getUserById(id);
        return user.getOrders();
    }

    @Override
    public User updateUserLocation(long id, Location location) {
        User user = userDao.getUserById(id);
        user.setLocation(location);
        userDao.save(user);
        return user;
    }
}
