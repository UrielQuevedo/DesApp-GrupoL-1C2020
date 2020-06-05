package unq.ar.edu.dessap.grupol.model.offer;

import lombok.*;
import unq.ar.edu.dessap.grupol.model.Product;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter @Setter @AllArgsConstructor
public abstract class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Integer percentage;
    @Getter @Setter
    private LocalDate startOffer;
    @Getter @Setter
    private LocalDate endOffer;

    public Offer(Integer percentage, LocalDate startOffer, LocalDate endOffer) {
        this.percentage = percentage;
        this.startOffer = startOffer;
        this.endOffer = endOffer;
    }

    public Offer() {}

    public Boolean isOffer() {
        return true;
    }

    public Integer percentage() {
        if(this.isAvailableIn(LocalDate.now())) {
            return this.percentage;
        }
        return 0;
    }

    public Boolean isAvailableIn(LocalDate nowDate) {
        return this.startOffer.isBefore(nowDate) || this.startOffer.isEqual(nowDate) && this.endOffer.isAfter(nowDate) || this.endOffer.isEqual(nowDate);
    }

    public abstract Boolean isProductToApplyOffer(Product product);
}
