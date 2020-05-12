package unq.ar.edu.dessap.grupol.model;

import org.apache.tomcat.jni.Local;
import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.OrderBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

        User userMock = mock(User.class);

        Order order = OrderBuilder.aOrder()
                         .withUser(userMock).build();

        Assert.assertEquals(userMock, order.getUser());
    }

    @Test
    public void testGivenAOrderWithProductWhenReceiveGetProductThenGiveHisProduct() {

        Order order = OrderBuilder.aOrder()
                        .withProduct("lenovo").build();

        Assert.assertEquals("lenovo", order.getProduct());
    }

    @Test
    public void testGivenAOrderWithAmountWhenReceiveGetAmountThenGiveHisAmount() {

        Order order = OrderBuilder.aOrder()
                        .withAmount(1).build();

        Assert.assertEquals(new Integer(1), order.getAmount());
    }

    @Test
    public void testGivenAOrderWithStoreWhenReceiveGetStoreThenGiveHisStore() {

        Store storeMock = mock(Store.class);

        Order order = OrderBuilder.aOrder()
                         .withStore(storeMock).build();

        Assert.assertEquals(storeMock, order.getStore());
    }


    @Test
    public void testGivenAOrderWithDateWhenReceiveGetDateThenGiveHisDate() {

        LocalDateTime date = LocalDateTime.now();

        Order order = OrderBuilder.aOrder()
                         .withDate(date).build();

        Assert.assertEquals(date, order.getDate());
    }

    @Test
    public void testSetterOrder() {

        User userMock = mock(User.class);
        Store storeMock = mock(Store.class);
        LocalDateTime date = LocalDateTime.now();

        Order order = OrderBuilder.aOrder().build();

        order.setId(1);
        order.setUser(userMock);
        order.setProduct("lenovo");
        order.setAmount(1);
        order.setStore(storeMock);
        order.setDate(date);

        Assert.assertEquals(1, order.getId());
        Assert.assertEquals(userMock, order.getUser());
        Assert.assertEquals("lenovo", order.getProduct());
        Assert.assertEquals(new Integer(1), order.getAmount());
        Assert.assertEquals(storeMock, order.getStore());
        Assert.assertEquals(date, order.getDate());
    }

}
