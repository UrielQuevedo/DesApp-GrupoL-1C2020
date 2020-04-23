package unq.ar.edu.dessap.grupol.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "sectors")
public class Sector {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    @ManyToMany(mappedBy = "sectors")
    private List<Store> stores;

    public Sector () {}


}
