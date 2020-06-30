package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.PurchaseDto;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartDeleteProductDto;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;
import unq.ar.edu.dessap.grupol.model.ShoppingCart;

import java.util.HashMap;

@Service
public interface ShoppingCartService {
    ShoppingCart getShoppingCart(Long id);
    ShoppingCart addProductToShoppingCart(Long id, ShoppingCartProductDto shoppingCartProductDto);
    ShoppingCart removeProductToShoppingCart(Long id, ShoppingCartDeleteProductDto shoppingCartProductDto);
    ShoppingCart makePurchase(Long id, HashMap<Long, PurchaseDto> body);
}
