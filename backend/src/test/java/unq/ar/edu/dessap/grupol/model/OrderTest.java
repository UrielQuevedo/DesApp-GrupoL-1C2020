package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.OrderBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.mock;

public class OrderTest {

    @Test
    public void testGivenAOrderWithIdWhenReceiveGetIdThenGiveHisId() {

        Order order = OrderBuilder.aOrder()
                .withId(1).build();

        Assert.assertEquals(1, order.getId());
    }

    @Test
    public void testGivenAOrderWithBuyerWhenReceiveGetBuyerThenGiveHisBuyer() {

        Buyer buyerMock = mock(Buyer.class);

        Order order = OrderBuilder.aOrder()
                .withBuyer(buyerMock).build();

        Assert.assertEquals(buyerMock, order.getBuyer());
    }

    @Test
    public void testGivenAOrderWithProductsWhenReceiveSizeGetProductsThenGiveTheSizeFromProducts() {

        List<Product> products = new ArrayList<>();
        products.add(mock(Product.class));

        Order order = OrderBuilder.aOrder()
                .withProducts(products).build();

        Assert.assertEquals(1, order.getProducts().size());
    }

    @Test
    public void testGivenAOrderWithStoresWhenReceiveSizeGetStoresThenGiveTheSizeFromStores() {

        List<Store> stores = new ArrayList<>();
        stores.add(mock(Store.class));

        Order order = OrderBuilder.aOrder()
                .withStores(stores).build();

        Assert.assertEquals(1, order.getStores().size());
    }

    @Test
    public void testGivenAOrderWithDateWhenReceiveGetDateThenGiveHisDate() {

        Date dateMock = mock(Date.class);

        Order order = OrderBuilder.aOrder()
                .withDate(dateMock).build();

        Assert.assertEquals(dateMock, order.getDate());
    }

    @Test
    public void testSetterOrder() {

        Buyer buyerMock = mock(Buyer.class);

        List<Product> products = new ArrayList<>();
        products.add(mock(Product.class));

        List<Store> stores = new ArrayList<>();
        stores.add(mock(Store.class));

        Order order = OrderBuilder.aOrder().build();

        order.setId(1);
        order.setBuyer(buyerMock);
        order.setProducts(products);
        order.setStores(stores);

        Assert.assertEquals(1, order.getId());
        Assert.assertEquals(buyerMock, order.getBuyer());
        Assert.assertEquals(products, order.getProducts());
        Assert.assertEquals(stores, order.getStores());
    }

}
