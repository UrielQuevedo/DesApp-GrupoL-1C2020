package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.StoreBuilder;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;

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
}
