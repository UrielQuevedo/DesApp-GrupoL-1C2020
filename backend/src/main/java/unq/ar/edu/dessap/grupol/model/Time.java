package unq.ar.edu.dessap.grupol.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "times")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
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
}
