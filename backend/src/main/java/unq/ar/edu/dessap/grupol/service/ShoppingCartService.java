package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;
import unq.ar.edu.dessap.grupol.model.ShoppingCart;

@Service
public interface ShoppingCartService {
    ShoppingCart getShoppingCart(Long id);
    ShoppingCart addProductToShoppingCart(Long id, ShoppingCartProductDto shoppingCartProductDto);
}
