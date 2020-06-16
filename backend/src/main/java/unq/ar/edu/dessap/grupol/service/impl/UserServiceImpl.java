package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.dtos.EditUserDto;
import unq.ar.edu.dessap.grupol.controller.exception.EmailExistException;
import unq.ar.edu.dessap.grupol.controller.exception.LoginException;
import unq.ar.edu.dessap.grupol.controller.exception.PasswordIncorrectException;
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
                .password(this.encryptPassword(_password))
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
        if (this.isPasswordCorrect(password, user.getPassword())) {
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

    @Override
    public User editUser(EditUserDto userData) {
        User user = userDao.getUserByEmail(userData.getActualEmail());
        if (this.isPasswordCorrect(userData.getActualPassword(), user.getPassword())) {
            this.setEmailUser(user, userData.getEmail());
            this.setPasswordUser(user, userData.getPassword());
            user.setUsername(userData.getUsername());
            userDao.save(user);
            return user;
        }
        throw new PasswordIncorrectException();
    }

    private void setEmailUser(User user, String newEmail) {
        if(!user.getEmail().equals(newEmail)) {
            if(userDao.existEmail(newEmail)) throw new EmailExistException();
            user.setEmail(newEmail);
        }
    }

    private void setPasswordUser(User user, String newPassword) {
        System.out.println("CONSOLAAAAAAAAAAAAAAAAAAAAAAAAAA: " +!newPassword.equals(""));
        if(!newPassword.equals("") && !isPasswordCorrect(newPassword, user.getPassword())){
            System.out.println("ENTROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            user.setPassword(this.encryptPassword(newPassword));
        }
        System.out.println("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    }

    private Boolean isPasswordCorrect(String passwordToVerify, String passwordCorrectly){
        return passwordEncoder.matches(passwordToVerify, passwordCorrectly);
    }

    private String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
