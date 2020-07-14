package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.model.*;
import unq.ar.edu.dessap.grupol.model.offer.Offer;
import unq.ar.edu.dessap.grupol.model.offer.ProductOffer;
import unq.ar.edu.dessap.grupol.persistence.StoreDao;
import unq.ar.edu.dessap.grupol.persistence.UserDao;
import unq.ar.edu.dessap.grupol.service.UserService;

import javax.annotation.PostConstruct;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class InitService {
    private final List<DayOfWeek> openDays =
            new ArrayList<>(Arrays.asList(DayOfWeek.MONDAY, DayOfWeek.WEDNESDAY, DayOfWeek.FRIDAY, DayOfWeek.TUESDAY, DayOfWeek.THURSDAY, DayOfWeek.SUNDAY, DayOfWeek.SATURDAY));

    @Autowired
    private UserDao userDao;

    @Autowired
    private StoreDao storeDao;

    @Autowired
    private UserService userService;

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
        this.createProductsOffer();
        this.testDeCreacion(10);
    }

    private void createSimpleUsers() {
        userService.create("Uriel Quevedo", "test", "quevedouriel3@gmail.com");
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
                .image_url("https://walmartar.vteximg.com.br/arquivos/ids/848517-1000-1000/Fideos-Tallarin-Matarazzo-500gr-1-13350.jpg?v=636994053716730000")
                .stock(60)
                .build();

        Product product2 = Product.builder()
                .category(Category.GALLETITAS)
                .brand("oreo")
                .name("chocolate")
                .price(100.00)
                .image_url("https://mayoristaencountry.com/25419-large_default/galletas-oreo-117-gr.jpg")
                .stock(50)
                .build();

        Product product3 = Product.builder()
                .category(Category.GALLETITAS)
                .brand("don satur")
                .name("salado")
                .price(150.00)
                .image_url("https://www.deliargentina.com/image/cache/catalog/product/alimentacion/bizcochitos-salados-de-grasa-don-satur-argentinos/bizcochitos-salados-de-grasa-don-satur-argentinos-550x550.jpg")
                .stock(100)
                .build();

        Product product4 = Product.builder()
                .category(Category.FIAMBRE)
                .brand("paladini")
                .name("queso")
                .image_url("https://www.paladini.com.ar/assets/img/productos/productos/danbo.jpg")
                .price(80.00)
                .stock(100)
                .build();

        Product product5 = Product.builder()
                .category(Category.FIAMBRE)
                .brand("214")
                .name("salame")
                .price(80.00)
                .image_url("https://www.riosma.com/adminriosma/views/img/plantilla/logo-salame-tipo-milan-grande-101-388.png")
                .stock(60)
                .build();

        Product product6 = Product.builder()
                .category(Category.BEBIDAS)
                .brand("cocacola")
                .name("zero")
                .price(160.00)
                .image_url("https://d26lpennugtm8s.cloudfront.net/stores/001/157/846/products/coca-zero-1-51-0bcc196c41b2d8eeca15871731141912-640-0.jpg")
                .stock(20)
                .build();

        products.add(product);
        products.add(product2);
        products.add(product3);
        products.add(product4);
        products.add(product5);
        products.add(product6);

        Location location = new Location(-34.716633, -58.259892, "Calle bonita");
        final List<Time> times = new ArrayList<>();
        final Time time = Time.builder().of("08:00").until("23:00").build();;
        times.add(time);

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("chino")
                .payments(new ArrayList<>(Arrays.asList(Payment.TARJETA, Payment.EFECTIVO)))
                .sector(Sector.ALMACEN)
                .openDays(openDays)
                .products(products)
                .times(times)
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
        final List<Time> times = new ArrayList<>();
        final Time time = Time.builder().of("08:00").until("23:00").build();;
        times.add(time);

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("Chino de la esquina")
                .sector(Sector.ALMACEN)
                .products(products)
                .openDays(openDays)
                .payments(new ArrayList<>(Arrays.asList(Payment.TARJETA, Payment.EFECTIVO)))
                .times(times)
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
        final List<Time> times = new ArrayList<>();
        final Time time = Time.builder().of("08:00").until("23:00").build();;
        times.add(time);

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("Rifarita")
                .sector(Sector.ALMACEN)
                .products(products)
                .openDays(openDays)
                .times(times)
                .payments(new ArrayList<>(Arrays.asList(Payment.TARJETA, Payment.EFECTIVO)))
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
        final List<Time> times = new ArrayList<>();
        final Time time = Time.builder().of("08:00").until("23:00").build();;
        times.add(time);

        Store store = Store.builder()
                .maxDistance(20.00)
                .name("test")
                .sector(Sector.ALMACEN)
                .products(products)
                .openDays(openDays)
                .location(location)
                .times(times)
                .payments(new ArrayList<>(Arrays.asList(Payment.TARJETA, Payment.EFECTIVO)))
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

    public void createProductsOffer() {
        List<Product> products = new ArrayList<>();
        List<Payment> payments = new ArrayList<>(Arrays.asList(Payment.EFECTIVO, Payment.TARJETA));

        Product product = Product.builder()
                .brand("Oreo")
                .category(Category.GALLETITAS)
                .image_url("https://images.rappi.com.ar/products/1258550-1591318565542.png?d=200x200&e=webp")
                .name("Galletitas Oreo Rellenas de Chocolate")
                .stock(60)
                .price(57.80)
                .build();

        Offer productOfert = new ProductOffer(product, 10, LocalDate.now(), LocalDate.now());

        product.setOfferToApply(productOfert);

        Location location = Location.builder()
                .address("Calle falsa 123")
                .latitude(-34.716614)
                .longitude(-58.260760)
                .build();

        products.add(product);

        final List<Time> times = new ArrayList<>();
        final Time time = Time.builder().of("08:00").until("23:00").build();;
        times.add(time);

        Store store = Store.builder()
                .location(location)
                .maxDistance(2.0)
                .name("Doña rosa")
                .payments(payments)
                .sector(Sector.ALMACEN)
                .products(products)
                .times(times)
                .openDays(openDays)
                .build();

        product.setStore(store);

        User user = User.builder()
                .email("marian@gmail.com")
                .location(location)
                .password("sarasa")
                .username("mariano")
                .store(store)
                .build();

        userDao.save(user);
    }

    private void testDeCreacion(int quantity) {
        List<Sector> sectors = new ArrayList<>(Arrays.asList(
                Sector.VERDULERIA, Sector.KIOSCO, Sector.FARMACIA, Sector.DIETETICA, Sector.CARNICERIA));

        sectors.forEach(sector -> {
            List<Store> stores = getCreateStoresByNames(sector, quantity);
            this.setLocationToStores(stores, quantity);
            System.out.println(stores);
            this.setUsersToStoresAndSave(stores);
        });
    }

    private List<Location> getXLocations(int x) {
        List<Location> locations = new ArrayList<>();
        for (int i = 0; i < x; i++) {
            Location location = Location.builder()
                    .address("Calle falsa " + (int) (Math.random() * 1000))
                    .latitude(this.generateRandomDouble(-34.73, -34.71))
                    .longitude(this.generateRandomDouble(-58.26,-58.25))
                    .build();
            locations.add(location);
        }
        return locations;
    }

    private double generateRandomDouble(double max, double min) {
        return (double) Math.round((Math.random()*(max - min) + min) * 100000d) / 100000d;
    }

    private List<Store> getCreateStoresByNames(Sector sector, int quantity) {
        List<Payment> payments = new ArrayList<>(Arrays.asList(Payment.EFECTIVO, Payment.TARJETA));
        List<Store> stores = new ArrayList<>();
        for (int i = 0; i < quantity; i++) {
            stores.add(Store.builder()
                    .name(sector.toString() + " " + i)
                    .maxDistance(10.0)
                    .sector(sector)
                    .payments(payments)
                    .build());
        }
        return stores;
    }

    private void setLocationToStores(List<Store> stores, int numberLocation) {
        int index = 0;
        for (Location location : this.getXLocations(numberLocation) ) {
            Store store = stores.get(index);
            store.setLocation(location);
            index++;
        }
    }

    private void setUsersToStoresAndSave(List<Store> stores) {
        Location location = Location.builder()
                .address("Calle falsa 123")
                .latitude(-34.716614)
                .longitude(-58.260760)
                .build();

        stores.forEach(store -> {
            User user = User.builder()
                    .email("marian" + store.getName() + "@gmail.com")
                    .location(location)
                    .password("sarasa")
                    .username("mariano")
                    .store(store)
                    .build();
            userDao.save(user);
        });
    }

}
