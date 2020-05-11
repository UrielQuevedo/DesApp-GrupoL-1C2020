package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.SellerBuilder;
import unq.ar.edu.dessap.grupol.service.builder.StoreBuilder;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class StoreTest {

    @Test
    public void testGivenAStoreWithNameWhenReceiveGetNameThenGiveHisName() {
        Store Store1 = StoreBuilder.aStore()
                .withName("store1").build();

        Assert.assertEquals("store1", Store1.getName());
    }

    @Test
    public void testGivenAStoreWithAddressWhenReceiveGetAddressThenGiveHisAddress() {
        Location location = mock(Location.class);
        Store Store1 = StoreBuilder.aStore()
                .withAddress(location).build();

        Assert.assertEquals(location, Store1.getLocation());
    }

    @Test
    public void testGivenAStoreWithMaxDistanceWhenReceiveGetMaxDistanceThenGiveHisMaxDistance() {
        Store Store1 = StoreBuilder.aStore()
                .withMaxDistance(new Double(100.1)).build();

        Assert.assertEquals(new Double(100.1), Store1.getMaxDistance());
    }

    @Test
    public void testGivenAStoreWithOneSectorWhenReceiveSizeGetSectorsThenGiveTheSizeFromSectors() {

        List<Sector> sectors = new ArrayList<>();
        sectors.add(new Sector());

        Store Store1 = StoreBuilder.aStore()
                .withSectors(sectors).build();

        Assert.assertEquals(1, Store1.getSectors().size());
    }

    @Test
    public void testGivenAStoreThatOpenThreeDaysOfWeekWhenReceiveSizeGetOpenDaysThenGiveTheSizeFromTheOpenDays() {

        List<DayOfWeek> days = new ArrayList<>();
        days.add(DayOfWeek.MONDAY);
        days.add(DayOfWeek.WEDNESDAY);
        days.add(DayOfWeek.FRIDAY);

        Store Store1 = StoreBuilder.aStore()
                .withOpenDays(days).build();

        Assert.assertEquals(3, Store1.getOpenDays().size());
    }

    @Test
    public void testGivenAStoreWithOnePaymentMethodWhenReceiveSizeGetPaymentsThenGiveTheSizeFromThePayments() {

        List<Payment> payments = new ArrayList<>();
        payments.add(Payment.EFECTIVO);

        Store Store1 = StoreBuilder.aStore()
                .withPayments(payments).build();

        Assert.assertEquals(1, Store1.getPayments().size());
    }

    @Test
    public void testGivenAStoreWithATimeWhenReceiveSizeGetTimesThenGiveTheSizeFromTimes() {

        List<Time> times = new ArrayList<>();
        times.add(mock(Time.class));

        Store Store1 = StoreBuilder.aStore()
                .withTimes(times).build();

        Assert.assertEquals(1, Store1.getTimes().size());
    }

    @Test
    public void testGiveAStoreWithProdutsWhenReceiveSizeGetProductsThenGiveTheSizeFromProducts() {

        List<Product> products = new ArrayList<>();
        products.add(mock(Product.class));

        Store Store1 = StoreBuilder.aStore()
                .withProducts(products).build();

        Assert.assertEquals(1, Store1.getProducts().size());
    }

    @Test
    public void testSetterStore() {
        Store store = StoreBuilder.aStore().build();
        Location location = mock(Location.class);

        List<DayOfWeek> days = new ArrayList<>();
        days.add(DayOfWeek.MONDAY);

        List<Payment> payments = new ArrayList<>();
        payments.add(Payment.TARJETA_DE_DEBITO);

        Product product = mock(Product.class);
        List<Product> products = new ArrayList<>();
        products.add(product);

        Sector sector = mock(Sector.class);
        List<Sector> sectors = new ArrayList<>();
        sectors.add(sector);

        Time time = mock(Time.class);
        List<Time> times = new ArrayList<>();
        times.add(time);

        Seller seller = mock(Seller.class);

        store.setId(1);
        store.setLocation(location);
        store.setMaxDistance(2.0);
        store.setName("La Flauta");
        store.setOpenDays(days);
        store.setPayments(payments);
        store.setProducts(products);
        store.setSectors(sectors);
        store.setTimes(times);
        store.setSeller(seller);

        Assert.assertEquals(1, store.getId());
        Assert.assertEquals(location, store.getLocation());
        Assert.assertEquals(2.0, store.getMaxDistance(), 0.0);
        Assert.assertEquals("La Flauta", store.getName());
        Assert.assertEquals(DayOfWeek.MONDAY, store.getOpenDays().get(0));
        Assert.assertEquals(Payment.TARJETA_DE_DEBITO, store.getPayments().get(0));
        Assert.assertEquals(product, store.getProducts().get(0));
        Assert.assertEquals(sector, store.getSectors().get(0));
        Assert.assertEquals(time, store.getTimes().get(0));
        Assert.assertEquals(seller, store.getSeller());
    }

    @Test
    public void testAddsStore() {
        Store store = StoreBuilder.aStore().build();
        Sector sector = mock(Sector.class);
        Time time = mock(Time.class);

        store.addDay(DayOfWeek.MONDAY);
        store.addPayments(Payment.MERCADO_PAGO);
        store.addSector(sector);
        store.addTimes(time);

        Assert.assertEquals(DayOfWeek.MONDAY, store.getOpenDays().get(0));
        Assert.assertEquals(Payment.MERCADO_PAGO, store.getPayments().get(0));
        Assert.assertEquals(sector, store.getSectors().get(0));
        Assert.assertEquals(time, store.getTimes().get(0));
    }

    @Test
    public void testGivenAStoreWithSellerWhenReceiveGetSellerThenGiveASeller() {

        Seller seller = mock(Seller.class);

        Store store = StoreBuilder.aStore()
                            .withSeller(seller).build();

        Assert.assertEquals(seller, store.getSeller());
    }

    @Test
    public void testGivenAStoreWithATurnWhenReceiveSizeGetTurnsThenGiveHisSizeGetTurns() {

        List<Turn> turns = new ArrayList<>();
        turns.add(mock(Turn.class));

        Store store = StoreBuilder.aStore()
                         .withTurns(turns).build();

        Assert.assertEquals(1, store.getTurns().size());
    }

}
