package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.ShoppingCart;
import unq.ar.edu.dessap.grupol.model.User;
import unq.ar.edu.dessap.grupol.persistence.ProductDao;
import unq.ar.edu.dessap.grupol.persistence.UserDao;
import unq.ar.edu.dessap.grupol.service.ShoppingCartService;

import java.util.Optional;

@Service
@Transactional
public class ShoppingCartImpl implements ShoppingCartService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProductDao productDao;

    @Override
    public ShoppingCart getShoppingCart(Long id) {
        User user = userDao.getUserById(id);
        return user.getShoppingCart();
    }

    @Override
    public ShoppingCart addProductToShoppingCart(Long id, ShoppingCartProductDto shoppingCartProductDto) {
        User user = userDao.getUserById(id);
        ShoppingCart shoppingCart = user.getShoppingCart();
        Product product = productDao.getProductById(shoppingCartProductDto.getProductId());

        Optional<Order> optionalOrder = shoppingCart.getOrder(product.getStore().getId());

        if(optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            this.addProductToOrder(order, product, shoppingCartProductDto);
        } else {
            Order newOrder = shoppingCart.createOrder(product.getStore());
            this.addProductToOrder(newOrder, product, shoppingCartProductDto);
        }
        userDao.save(user);
        return shoppingCart;
    }

    private void addProductToOrder(Order order, Product product, ShoppingCartProductDto shoppingCartProductDto) {
        order.addProductOrder(product, shoppingCartProductDto.getQuantity(), shoppingCartProductDto.getTotalPrice());
    }
}
