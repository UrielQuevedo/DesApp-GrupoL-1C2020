package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.dtos.PurchaseDto;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartDeleteProductDto;
import unq.ar.edu.dessap.grupol.controller.dtos.ShoppingCartProductDto;
import unq.ar.edu.dessap.grupol.model.*;
import unq.ar.edu.dessap.grupol.persistence.*;
import unq.ar.edu.dessap.grupol.service.ShoppingCartService;

import java.util.HashMap;

@Service
@Transactional
public class ShoppingCartImpl implements ShoppingCartService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private StoreDao storeDao;

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

    @Override
    public ShoppingCart makePurchase(Long userId, HashMap<Long, PurchaseDto> body) {
        User user = userDao.getUserById(userId);
        ShoppingCart shoppingCart = user.getShoppingCart();
        shoppingCart.getOrders().forEach(order -> {
            PurchaseDto purchaseDto = body.get(order.getId());
            if (purchaseDto == null) throw new RuntimeException("Faltan datos para finalizar la compra");
            this.makePurchaseSwitch(user, purchaseDto, order);
        });
        user.makeAOrderHistory();
        userDao.save(user);
        return shoppingCart;
    }

    private void makePurchaseSwitch(User user, PurchaseDto purchaseDto, Order order) {
        order.verify(purchaseDto.getPayment());
        order.makePurchase();
        switch (purchaseDto.getMethodOfDelivery()) {
            case ("Delivery") : {
                //Enviar email con en horario y dia de entrega
                break;
            }
            case ("Turn") : {
                this.manageTurn(order.getStore(), purchaseDto.getTurnTime(), user);
                break;
            }
            default: {
                throw new RuntimeException("Datos invalidos");
            }
        }
    }

    private void manageTurn(Store store, String time, User user) {
        store.verifyTurn(time);
        Turn turn = Turn.builder()
                .user(user)
                .store(store)
                .time(time)
                .build();
        store.addTurn(turn);
        storeDao.save(store);
    }
}
