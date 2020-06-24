package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartDeleteProductDto;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.model.ProductOrder;
import unq.ar.edu.dessap.grupol.model.ShoppingCart;

import java.util.List;

@Service
public interface ShoppingCartService {
    ShoppingCart getShoppingCart(Long id);
    ShoppingCart addProductToShoppingCart(Long id, ShoppingCartProductDto shoppingCartProductDto);
    ShoppingCart removeProductToShoppingCart(Long id, ShoppingCartDeleteProductDto shoppingCartProductDto);
}
