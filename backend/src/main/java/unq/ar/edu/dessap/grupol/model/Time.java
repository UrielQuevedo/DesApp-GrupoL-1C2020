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

    public Time() {}

    public Time(String of, String until) {
        this.of = of;
        this.until = until;
        this.stores = new ArrayList<>();
    }

}
