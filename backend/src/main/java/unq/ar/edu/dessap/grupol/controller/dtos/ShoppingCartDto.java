package unq.ar.edu.dessap.grupol.controller.dtos;

import lombok.Builder;
import lombok.Data;
import unq.ar.edu.dessap.grupol.model.Order;

import java.util.List;

@Data @Builder
public class ShoppingCartDto {
    Long id;
    List<Order> orders;
    Integer totalQuantity;
    Double totalPrice;
}
