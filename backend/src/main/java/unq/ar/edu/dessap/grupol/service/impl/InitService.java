package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.persistence.UserDao;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class InitService {

    @Autowired
    private UserDao userDao;

    @PostConstruct
    public void initialize() {
        this.createUsers();
        this.createStores();
    }

    private void createUsers() {
        List<String> names = new ArrayList<>(Arrays.asList("test","chino","24Open","Chino Saran"));
        for (String name : names) {
            User user = User.builder()
                    .email(name + "@gmail.com")
                    .password("test")
                    .username(name)
                    .build();
            userDao.save(user);
        }
    }

    private void createStores() {

    }


}
