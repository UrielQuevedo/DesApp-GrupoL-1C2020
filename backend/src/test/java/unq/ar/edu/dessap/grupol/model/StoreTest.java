package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.StoreBuilder;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

public class StoreTest {

    @Test
    public void testGivenAStoreWithIdWhenReceiveGetIdThenGiveHisId() {
        Store store = StoreBuilder.aStore()
                .withId(1).build();

        Assert.assertEquals(1, store.getId());
    }

    @Test
    public void testGivenAStoreWithNameWhenReceiveGetNameThenGiveHisName() {
        Store store = StoreBuilder.aStore()
                .withName("store1").build();

        Assert.assertEquals("store1", store.getName());
    }

    @Test
    public void testGivenAStoreWithAddressWhenReceiveGetAddressThenGiveHisAddress() {
        Store store = StoreBuilder.aStore()
                .withAddress("calle falsa 123").build();

        Assert.assertEquals("calle falsa 123", store.getAddress());
    }

    @Test
    public void testGivenAStoreWithMaxDistanceWhenReceiveGetMaxDistanceThenGiveHisMaxDistance() {
        Store store = StoreBuilder.aStore()
                .withMaxDistance(new Double(100.1)).build();

        Assert.assertEquals(new Double(100.1), store.getMaxDistance());
    }

    @Test
    public void testGivenAStoreWithOneSectorWhenReceiveSizeGetSectorsThenGiveTheSizeFromSectors() {

        List<Sector> sectors = new ArrayList<>();
        sectors.add(new Sector());

        Store store = StoreBuilder.aStore()
                .withSectors(sectors).build();

        Assert.assertEquals(1, store.getSectors().size());
    }

    @Test
    public void testGivenAStoreThatOpenThreeDaysOfWeekWhenReceiveSizeGetOpenDaysThenGiveTheSizeFromTheOpenDays() {

        List<DayOfWeek> days = new ArrayList<>();
        days.add(DayOfWeek.MONDAY);
        days.add(DayOfWeek.WEDNESDAY);
        days.add(DayOfWeek.FRIDAY);

        Store store = StoreBuilder.aStore()
                .withOpenDays(days).build();

        Assert.assertEquals(3, store.getOpenDays().size());
    }

    @Test
    public void testGivenAStoreWithOnePaymentMethodWhenReceiveSizeGetPaymentsThenGiveTheSizeFromThePayments() {

        List<Payment> payments = new ArrayList<>();
        payments.add(Payment.EFECTIVO);

        Store store = StoreBuilder.aStore()
                .withPayments(payments).build();

        Assert.assertEquals(1, store.getPayments().size());
    }

    @Test
    public void testGivenAStoreWithATimeWhenReceiveSizeGetTimesThenGiveTheSizeFromTimes() {

        List<Time> times = new ArrayList<>();
        times.add(new Time());

        Store store = StoreBuilder.aStore()
                .withTimes(times).build();

        Assert.assertEquals(1, store.getTimes().size());
    }



}
