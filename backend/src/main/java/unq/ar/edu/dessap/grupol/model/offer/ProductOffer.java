package unq.ar.edu.dessap.grupol.model.offer;

import lombok.Getter;
import lombok.Setter;
import unq.ar.edu.dessap.grupol.model.Product;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@Entity
public class ProductOffer extends Offer{
    @OneToOne
    @JoinColumn(name = "fk_product_id")
    @Getter @Setter
    private Product product;

    public ProductOffer(){}

    public ProductOffer(Product product, Integer percentage, LocalDate startOffer, LocalDate endOffer) {
        super(percentage, startOffer, endOffer);
        this.product = product;
    }

    public Boolean isProductToApplyOffer(Product product) {
        return true;
    }
}
