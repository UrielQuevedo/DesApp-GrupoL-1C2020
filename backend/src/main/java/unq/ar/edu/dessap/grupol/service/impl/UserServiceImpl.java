package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.dtos.EditUserDto;
import unq.ar.edu.dessap.grupol.controller.exception.EmailExistException;
import unq.ar.edu.dessap.grupol.controller.exception.LoginException;
import unq.ar.edu.dessap.grupol.controller.exception.NotFound;
import unq.ar.edu.dessap.grupol.controller.exception.PasswordIncorrectException;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.OrderHistory;
import unq.ar.edu.dessap.grupol.model.ShoppingCart;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.persistence.UserDao;
import unq.ar.edu.dessap.grupol.security.JwtTokenUtil;
import unq.ar.edu.dessap.grupol.security.JwtUserDetailsService;
import unq.ar.edu.dessap.grupol.service.UserService;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserDao userDao;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Override
    public User create(String _username, String _password, String _email) {
        if(userDao.existEmail(_email)) throw new EmailExistException();
        ShoppingCart shoppingCart = ShoppingCart.builder()
                .totalPrice(0.00)
                .totalQuantity(0)
                .build();

        User user = User.builder()
                .email(_email)
                .password(this.encryptPassword(_password))
                .username(_username)
                .shoppingCart(shoppingCart)
                .build();

        shoppingCart.setUser(user);

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
            generateTokenIfNotExist(user);
            return user;
        }
        throw new LoginException();
    }

    private void generateTokenIfNotExist(User user) {
        if(user.getToken() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            String token = jwtTokenUtil.generateToken(userDetails);
            user.setToken(token);
        }
    }

    @Override
    public List<OrderHistory> getUserOrdersById(long id) {
        User user = userDao.getUserById(id);
        return user.getOrdersHistory();
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

    @Override
    public User getUserByEmail(String email) {
        User user = userDao.getUserByEmail(email);
        if(user == null) {
            throw new NotFound();
        }
        generateTokenIfNotExist(user);
        return user;
    }

    @Override
    public User createWithUsernameAndEmail(String username, String email) {
        if(userDao.existEmail(email)) throw new EmailExistException();
        User user = User.builder()
                .email(email)
                .username(username)
                .build();

        userDao.save(user);
        return user;
    }

    private void setEmailUser(User user, String newEmail) {
        if(!user.getEmail().equals(newEmail)) {
            if(userDao.existEmail(newEmail)) throw new EmailExistException();
            user.setEmail(newEmail);
        }
    }

    private void setPasswordUser(User user, String newPassword) {
        if(!newPassword.equals("") && !isPasswordCorrect(newPassword, user.getPassword())){
            user.setPassword(this.encryptPassword(newPassword));
        }
    }

    private Boolean isPasswordCorrect(String passwordToVerify, String passwordCorrectly){
        return passwordEncoder.matches(passwordToVerify, passwordCorrectly);
    }

    private String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
