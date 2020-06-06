package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void initialize() {
        this.createSimpleUsers();
        this.createStores();
        this.createUserWithStoreAndHisProducts();
        this.createUserWithStoreAndHisProducts2();
        this.createUserWithStoreAndHisProducts3();
        this.createUserWithStoreAndHisProducts4();
    }

    private void createSimpleUsers() {
        List<String> names = new ArrayList<>(Arrays.asList("24Open"));
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
        List<String> names = new ArrayList<>(Arrays.asList("Don rulo", "Miguelito", "Osvaldito", "Chino Fast"));

        Location location = new Location(-34.715310, -58.260750, "Calle falsa");
        Location location4 = new Location(-34.715575, -58.257918, "Calle atrevida");
        Location location5 = new Location(-34.719163, -58.259830, "Calle sin luz");
        Location location6 = new Location(-34.716023, -58.263253, "Calle sin numeros");

        List<Location> locations = new ArrayList<>(Arrays.asList(location, location4, location5, location6));
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

    private void createUserWithStoreAndHisProducts() {
        List<Product> products = new ArrayList<>();

        Product product = Product.builder()
                .category(Category.FIDEOS)
                .brand("matarasos")
                .name("fideos largos")
                .price(80.00)
                .stock(60)
                .build();

        Product product2 = Product.builder()
                .category(Category.GALLETITAS)
                .brand("oreo")
                .name("chocolate")
                .price(100.00)
                .stock(50)
                .build();

        Product product3 = Product.builder()
                .category(Category.GALLETITAS)
                .brand("don satur")
                .name("salado")
                .price(150.00)
                .stock(100)
                .build();

        Product product4 = Product.builder()
                .category(Category.FIAMBRE)
                .brand("paladini")
                .name("queso")
                .price(80.00)
                .stock(100)
                .build();

        Product product5 = Product.builder()
                .category(Category.FIAMBRE)
                .brand("214")
                .name("salame")
                .price(80.00)
                .stock(60)
                .build();

        Product product6 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("cocacola")
                .name("zero")
                .price(160.00)
                .stock(20)
                .build();

        products.add(product);
        products.add(product2);
        products.add(product3);
        products.add(product4);
        products.add(product5);
        products.add(product6);

        Location location = new Location(-34.716633, -58.259892, "Calle bonita");

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("chino")
                .sector(Sector.ALMACEN)
                .products(products)
                .location(location)
                .build();
        product.setStore(store);
        product2.setStore(store);
        product3.setStore(store);
        product4.setStore(store);
        product5.setStore(store);
        product6.setStore(store);


        User user = User.builder()
                .email("chino@gmail.com")
                .password(passwordEncoder.encode("test"))
                .username("chino")
                .store(store)
                .build();

        userDao.save(user);
    }

    private void createUserWithStoreAndHisProducts2() {
        List<Product> products = new ArrayList<>();

        Product product = Product.builder()
                .category(Category.FIDEOS)
                .brand("lucheti")
                .name("codito")
                .price(60.00)
                .stock(50)
                .build();

        Product product2 = Product.builder()
                .category(Category.GALLETITAS)
                .brand("don satur")
                .name("dulce")
                .price(100.00)
                .stock(70)
                .build();

        Product product3 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("pepsi")
                .name("cola")
                .price(150.00)
                .stock(100)
                .build();

        Product product4 = Product.builder()
                .category(Category.FIAMBRE)
                .brand("paladini")
                .name("queso muzza")
                .price(80.00)
                .stock(100)
                .build();

        Product product5 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("branca")
                .name("fernet")
                .price(400.00)
                .stock(150)
                .build();

        Product product6 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("andes")
                .name("roja")
                .price(200.00)
                .stock(100)
                .build();

        products.add(product);
        products.add(product2);
        products.add(product3);
        products.add(product4);
        products.add(product5);
        products.add(product6);

        Location location = new Location(-34.715692, -58.257890, "Calle con chinos");

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("Chino de la esquina")
                .sector(Sector.ALMACEN)
                .products(products)
                .location(location)
                .build();

        product.setStore(store);
        product2.setStore(store);
        product3.setStore(store);
        product4.setStore(store);
        product5.setStore(store);
        product6.setStore(store);

        User user = User.builder()
                .email("elchinidelaesquina@gmail.com")
                .password(passwordEncoder.encode("test"))
                .username("Chino Saran")
                .store(store)
                .build();

        userDao.save(user);
    }

    private void createUserWithStoreAndHisProducts3() {
        List<Product> products = new ArrayList<>();

        Product product = Product.builder()
                .category(Category.FIDEOS)
                .brand("lucheti")
                .name("mostachol")
                .price(80.00)
                .stock(200)
                .build();

        Product product2 = Product.builder()
                .category(Category.GALLETITAS)
                .brand("terrabusi")
                .name("salado")
                .price(150.00)
                .stock(100)
                .build();

        Product product3 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("cocacola")
                .name("sprite")
                .price(150.00)
                .stock(100)
                .build();

        Product product4 = Product.builder()
                .category(Category.FIAMBRE)
                .brand("paladini")
                .name("queso roquefort")
                .price(150.00)
                .stock(80)
                .build();

        Product product5 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("branca")
                .name("fernet")
                .price(450.00)
                .stock(150)
                .build();

        Product product6 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("andes")
                .name("rubia")
                .price(170.00)
                .stock(300)
                .build();

        products.add(product);
        products.add(product2);
        products.add(product3);
        products.add(product4);
        products.add(product5);
        products.add(product6);

        Location location = new Location(-34.718220, -58.257757, "Calle fea");

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("Rifarita")
                .sector(Sector.ALMACEN)
                .products(products)
                .location(location)
                .build();

        product.setStore(store);
        product2.setStore(store);
        product3.setStore(store);
        product4.setStore(store);
        product5.setStore(store);
        product6.setStore(store);

        User user = User.builder()
                .email("rafita@gmail.com")
                .password(passwordEncoder.encode("test"))
                .username("El rafi adb")
                .store(store)
                .build();

        userDao.save(user);
    }

    private void createUserWithStoreAndHisProducts4() {
        List<Product> products = new ArrayList<>();

        Product product = Product.builder()
                .category(Category.FIDEOS)
                .brand("lucheti")
                .name("largos")
                .price(150.00)
                .stock(200)
                .build();

        Product product2 = Product.builder()
                .category(Category.GALLETITAS)
                .brand("toddy")
                .name("con chips")
                .price(100.00)
                .stock(300)
                .build();

        Product product3 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("pepsi")
                .name("cola")
                .price(150.00)
                .stock(100)
                .build();

        Product product4 = Product.builder()
                .category(Category.FIAMBRE)
                .brand("paladini")
                .name("queso")
                .price(150.00)
                .stock(80)
                .build();

        Product product5 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("ipa")
                .name("roja")
                .price(250.00)
                .stock(200)
                .build();

        Product product6 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("andes")
                .name("negra")
                .price(150.00)
                .stock(350)
                .build();

        products.add(product);
        products.add(product2);
        products.add(product3);
        products.add(product4);
        products.add(product5);
        products.add(product6);

        Location location = new Location(-34.735310, -58.260750, "Calle larga");

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("test")
                .sector(Sector.ALMACEN)
                .products(products)
                .location(location)
                .build();

        product.setStore(store);
        product2.setStore(store);
        product3.setStore(store);
        product4.setStore(store);
        product5.setStore(store);
        product6.setStore(store);

        User user = User.builder()
                .email("test@gmail.com")
                .password(passwordEncoder.encode("test"))
                .username("Test")
                .store(store)
                .build();

        userDao.save(user);
    }


}
