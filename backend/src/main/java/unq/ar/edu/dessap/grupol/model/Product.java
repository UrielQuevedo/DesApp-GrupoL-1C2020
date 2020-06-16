package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import unq.ar.edu.dessap.grupol.model.offer.Offer;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, name = "product_id")
    private long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private int stock;
    @Column(nullable = false)
    private double price;
    private String image_url;
    @Enumerated(value = EnumType.STRING)
    private Category category;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "fk_store_id")
    @JsonIgnore
    private Store store;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_offer_id")
    private Offer offerToApply;
}
