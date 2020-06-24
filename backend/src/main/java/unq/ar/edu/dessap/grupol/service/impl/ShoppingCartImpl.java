package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartDeleteProductDto;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;
import unq.ar.edu.dessap.grupol.model.*;
import unq.ar.edu.dessap.grupol.persistence.OrderDao;
import unq.ar.edu.dessap.grupol.persistence.ProductDao;
import unq.ar.edu.dessap.grupol.persistence.ProductOrderDao;
import unq.ar.edu.dessap.grupol.persistence.UserDao;
import unq.ar.edu.dessap.grupol.service.ShoppingCartService;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ShoppingCartImpl implements ShoppingCartService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private ProductOrderDao productOrderDao;

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
        shoppingCart.addProductOrder(product, shoppingCartProductDto.getQuantity());

        userDao.save(user);
        return shoppingCart;
    }

    @Override
    public ShoppingCart removeProductToShoppingCart(Long id, ShoppingCartDeleteProductDto shoppingCartDeleteProductDto) {
        ShoppingCart shoppingCart = this.getShoppingCart(id);
        Order order = orderDao.getOrderByIdAndByUserId(shoppingCartDeleteProductDto.getOrderId(), id);
        ProductOrder productOrder = productOrderDao.getProductOrderByIdAndByUserId(shoppingCartDeleteProductDto.getProductOrderId(), id);
        order.removeProductOrder(productOrder);
        if(order.getProductOrders().isEmpty()) {
            shoppingCart.removeOrder(order.getId());
            orderDao.deleteById(order.getId());
        } else {
            productOrderDao.deleteById(productOrder.getId());
            orderDao.save(order);
        }
        return shoppingCart;
    }

}
