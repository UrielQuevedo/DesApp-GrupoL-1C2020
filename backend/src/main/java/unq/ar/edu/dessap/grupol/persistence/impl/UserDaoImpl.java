package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.controller.exception.LoginException;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.persistence.UserDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.UserRepository;

import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) return optionalUser.get();
        throw new RuntimeException("No se encuentra el id");
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) return optionalUser.get();
        throw new LoginException();
    }
}
