package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.*;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

public class StoreBuilder {

    private long id;
    private String name;
    private List<Sector> sectors = new ArrayList<>();
    private Location location;
    private List<DayOfWeek> openDays = new ArrayList<>();
    private List<Time> times = new ArrayList<>();
    private List<Payment> payments = new ArrayList<>();
    private Double maxDistance;
    private List<Product> products = new ArrayList<>();
    private Seller seller;

    public static StoreBuilder aStore() {
        return new StoreBuilder();
    }

    public Store build() {
        return new Store(this.id, this.name, this.sectors, this.location, this.openDays, this.times,
                            this.payments, this.maxDistance, this.products, this.seller);
    }

    public StoreBuilder withId(final long id) {
        this.id = id;
        return this;
    }

    public StoreBuilder withName(final String name) {
        this.name = name;
        return this;
    }

    public StoreBuilder withAddress(final Location location) {
        this.location = location;
        return this;
    }

    public StoreBuilder withMaxDistance(final Double maxDistance) {
        this.maxDistance = maxDistance;
        return this;
    }

    public StoreBuilder withSectors(List<Sector> sectors) {
        this.sectors = sectors;
        return this;
    }

    public StoreBuilder withOpenDays(List<DayOfWeek> days) {
        this.openDays = days;
        return this;
    }

    public StoreBuilder withPayments(List<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public StoreBuilder withTimes(List<Time> times) {
        this.times = times;
        return this;
    }

    public StoreBuilder withProducts(List<Product> products) {
        this.products = products;
        return this;
    }


    public StoreBuilder withSeller(Seller seller) {
        this.seller = seller;
        return this;
    }

}
