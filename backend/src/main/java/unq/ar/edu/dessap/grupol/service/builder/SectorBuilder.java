package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Sector;
import unq.ar.edu.dessap.grupol.model.Store;

import java.util.List;

public class SectorBuilder {

    private long id;
    private String name;
    private List<Store> stores;

    public static SectorBuilder aSector() {
        return new SectorBuilder();
    }

    public Sector build() {
        return new Sector(this.id, this.name, this.stores);
    }


    public SectorBuilder withId(final long id) {
        this.id = id;
        return this;
    }

    public SectorBuilder withName(String name) {
        this.name = name;
        return this;
    }


    public SectorBuilder withStores(List<Store> stores) {
        this.stores = stores;
        return this;
    }

}
