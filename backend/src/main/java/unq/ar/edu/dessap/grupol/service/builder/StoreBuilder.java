package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.model.Sector;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.model.Time;

import java.time.DayOfWeek;
import java.util.List;

public class StoreBuilder {

    private long id;
    private String name;
    private List<Sector> sectors;
    private String address;
    private List<DayOfWeek> openDays;
    private List<Time> times;
    private List<String> payments;
    private Double maxDistance;

    public static StoreBuilder aStore() {
        return new StoreBuilder();
    }

    public Store build() {
        return new Store(this.id, this.name, this.sectors, this.address, this.openDays, this.times, this.payments, this.maxDistance);
    }


    public StoreBuilder withId(final long id) {
        this.id = id;
        return this;
    }


    public StoreBuilder withName(final String name) {
        this.name = name;
        return this;
    }

    public StoreBuilder withAddress(final String address) {
        this.address = address;
        return this;
    }

    public StoreBuilder withMaxDistance(final Double maxDistance) {
        this.maxDistance = maxDistance;
        return this;
    }

}
