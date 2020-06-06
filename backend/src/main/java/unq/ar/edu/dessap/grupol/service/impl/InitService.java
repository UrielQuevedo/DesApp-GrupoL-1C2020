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

    @Autowired
    private StoreDao storeDao;

    @PostConstruct
    public void initialize() {
        this.createSimpleUsers();
        this.createUserWithStore();
        this.createStores();
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

    private void createStores() {
        List<String> names = new ArrayList<>(Arrays.asList("Chino de la esquina","Rifarita","Don rulo","Miguelito","Osvaldito","Chino Fast"));

        Location location1 = new Location(-34.716633, -58.259892, "Calle bonita");
        Location location2 = new Location(-34.718220, -58.257757, "Calle fea");
        Location location3 = new Location(-34.715310, -58.260750, "Calle falsa");
        Location location4 = new Location(-34.715575, -58.257918, "Calle atrevida");
        Location location5 = new Location(-34.719163, -58.259830, "Calle sin luz");
        Location location6 = new Location(-34.716023, -58.263253, "Calle sin numeros");

        List<Location> locations = new ArrayList<>(Arrays.asList(location1, location2, location3, location4, location5, location6));
        List<Payment> payments = new ArrayList<>(Arrays.asList(Payment.EFECTIVO, Payment.TARJETA, Payment.EFECTIVO, Payment.EFECTIVO, Payment.TARJETA, Payment.EFECTIVO));
        int i = 0;
        for (String name : names) {
            List<Payment> storePayments = new ArrayList<>();
            storePayments.add(payments.get(i));
            Store store = Store.builder()
                    .maxDistance(20.00)
                    .name(name)
                    .sector(Sector.ALMACEN)
                    .payments(storePayments)
                    .location(locations.get(i))
                    .build();
            i++;
            storeDao.save(store);
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

        Location location = new Location(-34.715692, -58.257890, "Calle con chinos");

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("chino")
                .sector(Sector.ALMACEN)
                .products(products)
                .location(location)
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
