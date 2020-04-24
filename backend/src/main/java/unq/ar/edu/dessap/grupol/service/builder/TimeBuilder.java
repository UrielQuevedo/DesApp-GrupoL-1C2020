package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.model.Time;

import java.util.List;

public class TimeBuilder {

    private long id;
    private String of;
    private String until;
    private List<Store> stores;

    public static TimeBuilder aTime() { return new TimeBuilder(); }

    public Time build() { return new Time(this.id, this.of, this.until, this.stores); }

    public TimeBuilder withId(int id) {
        this.id = id;
        return this;
    }

    public TimeBuilder withOf(String of) {
        this.of = of;
        return this;
    }


    public TimeBuilder withUntil(String until) {
        this.until = until;
        return this;
    }

    public TimeBuilder withStores(List<Store> stores) {
        this.stores = stores;
        return this;
    }

}
