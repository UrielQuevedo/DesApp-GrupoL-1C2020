package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.model.*;
import unq.ar.edu.dessap.grupol.persistence.StoreDao;
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
        this.createSimpleUsers();
        this.createUserWithStore();
    }

    private void createSimpleUsers() {
        List<String> names = new ArrayList<>(Arrays.asList("test","24Open","Chino Saran"));
        for (String name : names) {
            User user = User.builder()
                    .email(name + "@gmail.com")
                    .password("test")
                    .username(name)
                    .build();
            userDao.save(user);
        }
    }

    private void createUserWithStore() {
        List<Product> products = new ArrayList<>();

        Product product = Product.builder()
                .category(Category.FIDEOS)
                .brand("matarasos")
                .name("fideos largos")
                .price(80.00)
                .stock(60)
                .build();

        products.add(product);

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("chino")
                .sector(Sector.ALMACEN)
                .products(products)
                .build();
        product.setStore(store);

        User user = User.builder()
                .email("chino@gmail.com")
                .password("test")
                .username("chino")
                .store(store)
                .build();

        userDao.save(user);
    }


}
