package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.persistence.UserDao;
import unq.ar.edu.dessap.grupol.service.builder.UserBuilder;

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
            User user = UserBuilder.aUser()
                    .withEmail(name + "@gmail.com")
                    .withPassword("test")
                    .withUsername(name)
                    .build();
            userDao.save(user);
        }
    }

    private void createStores() {

    }


}
