package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.*;

import java.time.DayOfWeek;
import java.util.List;

public class StoreBuilder {

    private long id;
    private String name;
    private List<Sector> sectors;
    private Location location;
    private List<DayOfWeek> openDays;
    private List<Time> times;
    private List<Payment> payments;
    private Double maxDistance;

    public static StoreBuilder aStore() {
        return new StoreBuilder();
    }

    public Store build() {
        return new Store(this.id, this.name, this.sectors, this.location, this.openDays, this.times, this.payments, this.maxDistance);
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

}
