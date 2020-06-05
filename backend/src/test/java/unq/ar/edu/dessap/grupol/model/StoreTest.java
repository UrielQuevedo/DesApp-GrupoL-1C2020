package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class StoreTest {

    @Test
    public void testGivenAStoreWithNameWhenReceiveGetNameThenGiveHisName() {
        Store Store1 = Store.builder()
                .name("store1").build();

        Assert.assertEquals("store1", Store1.getName());
    }

    @Test
    public void testGivenAStoreWithAddressWhenReceiveGetAddressThenGiveHisAddress() {
        Location location = mock(Location.class);
        Store Store1 = Store.builder()
                .location(location).build();

        Assert.assertEquals(location, Store1.getLocation());
    }

    @Test
    public void testGivenAStoreWithMaxDistanceWhenReceiveGetMaxDistanceThenGiveHisMaxDistance() {
        Store Store1 = Store.builder()
                .maxDistance(new Double(100.1)).build();

        Assert.assertEquals(new Double(100.1), Store1.getMaxDistance());
    }

    @Test
    public void testGivenAStoreWithOneSectorWhenReceiveSizeGetSectorsThenGiveTheSizeFromSectors() {

        Store Store1 = Store.builder()
                .sector(Sector.VERDULERIA).build();

        Assert.assertEquals(Sector.VERDULERIA, Store1.getSector());
    }

    @Test
    public void testGivenAStoreThatOpenThreeDaysOfWeekWhenReceiveSizeGetOpenDaysThenGiveTheSizeFromTheOpenDays() {

        List<DayOfWeek> days = new ArrayList<>();
        days.add(DayOfWeek.MONDAY);
        days.add(DayOfWeek.WEDNESDAY);
        days.add(DayOfWeek.FRIDAY);

        Store Store1 = Store.builder()
                .openDays(days).build();

        Assert.assertEquals(3, Store1.getOpenDays().size());
    }

    @Test
    public void testGivenAStoreWithOnePaymentMethodWhenReceiveSizeGetPaymentsThenGiveTheSizeFromThePayments() {

        List<Payment> payments = new ArrayList<>();
        payments.add(Payment.EFECTIVO);

        Store Store1 = Store.builder()
                .payments(payments).build();

        Assert.assertEquals(1, Store1.getPayments().size());
    }

    @Test
    public void testGivenAStoreWithATimeWhenReceiveSizeGetTimesThenGiveTheSizeFromTimes() {

        List<Time> times = new ArrayList<>();
        times.add(mock(Time.class));

        Store Store1 = Store.builder()
                .times(times).build();

        Assert.assertEquals(1, Store1.getTimes().size());
    }

    @Test
    public void testGiveAStoreWithProdutsWhenReceiveSizeGetProductsThenGiveTheSizeFromProducts() {

        List<Product> products = new ArrayList<>();
        products.add(mock(Product.class));

        Store Store1 = Store.builder()
                .products(products).build();

        Assert.assertEquals(1, Store1.getProducts().size());
    }

    @Test
    public void testSetterStore() {
        Store store = Store.builder().build();
        Location location = mock(Location.class);

        List<DayOfWeek> days = new ArrayList<>();
        days.add(DayOfWeek.MONDAY);

        List<Payment> payments = new ArrayList<>();
        payments.add(Payment.TARJETA_DE_DEBITO);

        Product product = mock(Product.class);
        List<Product> products = new ArrayList<>();
        products.add(product);

        Time time = mock(Time.class);
        List<Time> times = new ArrayList<>();
        times.add(time);

        Turn turn = mock(Turn.class);
        List<Turn> turns = new ArrayList<>();
        turns.add(turn);

        store.setId(1);
        store.setLocation(location);
        store.setMaxDistance(2.0);
        store.setName("La Flauta");
        store.setOpenDays(days);
        store.setPayments(payments);
        store.setProducts(products);
        store.setSector(Sector.VERDULERIA);
        store.setTimes(times);
        store.setTurns(turns);

        Assert.assertEquals(1, store.getId());
        Assert.assertEquals(location, store.getLocation());
        Assert.assertEquals(2.0, store.getMaxDistance(), 0.0);
        Assert.assertEquals("La Flauta", store.getName());
        Assert.assertEquals(DayOfWeek.MONDAY, store.getOpenDays().get(0));
        Assert.assertEquals(Payment.TARJETA_DE_DEBITO, store.getPayments().get(0));
        Assert.assertEquals(product, store.getProducts().get(0));
        Assert.assertEquals(Sector.VERDULERIA, store.getSector());
        Assert.assertEquals(time, store.getTimes().get(0));
        Assert.assertEquals(turn, store.getTurns().get(0));
    }

    @Test
    public void testAddsStore() {
        Store store = Store.builder().build();
        Time time = mock(Time.class);

        store.addDay(DayOfWeek.MONDAY);
        store.addPayments(Payment.MERCADO_PAGO);
        store.addTimes(time);

        Assert.assertEquals(DayOfWeek.MONDAY, store.getOpenDays().get(0));
        Assert.assertEquals(Payment.MERCADO_PAGO, store.getPayments().get(0));
        Assert.assertEquals(time, store.getTimes().get(0));
    }

    @Test
    public void testGivenAStoreWithATurnWhenReceiveSizeGetTurnsThenGiveHisSizeGetTurns() {

        List<Turn> turns = new ArrayList<>();
        turns.add(mock(Turn.class));

        Store store = Store.builder()
                         .turns(turns).build();

        Assert.assertEquals(1, store.getTurns().size());
    }

    @Test
    public void testGivenAStoreWithProductWhenReceiveSizeGetTurnsThenGiveHisSize() {

        Store store = Store.builder().build();

        store.addProduct(mock(Product.class));

        Assert.assertEquals(1, store.getProducts().size());
    }

}
