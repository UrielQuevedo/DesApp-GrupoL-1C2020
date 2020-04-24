package unq.ar.edu.dessap.grupol.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "times")
public class Time {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String of;

    @Column(nullable = false)
    private String until;

    @ManyToMany(mappedBy = "times")
    private List<Store> stores;

    public Time() {
    }

    public Time(long id, String of, String until, List<Store> stores) {
        this.id = id;
        this.of = of;
        this.until = until;
        this.stores = stores;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOf() {
        return of;
    }

    public void setOf(String of) {
        this.of = of;
    }

    public String getUntil() {
        return until;
    }

    public void setUntil(String until) {
        this.until = until;
    }

    public List<Store> getStores() {
        return stores;
    }

    public void setStores(List<Store> stores) {
        this.stores = stores;
    }

}
