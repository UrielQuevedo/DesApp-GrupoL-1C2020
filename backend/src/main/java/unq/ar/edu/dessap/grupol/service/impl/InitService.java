package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.service.UserService;

import javax.annotation.PostConstruct;

@Service
@Transactional
public class InitService {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initialize() {
        this.createUsers();
        this.createStores();
    }

    private void createUsers() {
        userService.create("Test", "test", "test@gmail.com");
    }

    private void createStores() {

    }


}
