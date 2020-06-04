package unq.ar.edu.dessap.grupol.model.offer;

import unq.ar.edu.dessap.grupol.model.Category;
import unq.ar.edu.dessap.grupol.model.Product;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

public class CategoryOffer extends Offer {
    @Enumerated(value = EnumType.STRING)
    private Category category;

    public CategoryOffer(Integer percentage, LocalDate startOffer, LocalDate endOffer) {
        super(percentage, startOffer, endOffer);
    }

    public CategoryOffer(){}

    public Boolean isProductToApplyOffer(Product product) {
        return product.getCategory().equals(this.category);
    }
}
