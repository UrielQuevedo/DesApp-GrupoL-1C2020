package unq.ar.edu.dessap.test.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.model.Time;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;

public class TimeTest {

    @Test
    public void testGivenATimeWithIdWhenReceiveGetIdThenGiveHisId() {
        Time Time1 = Time.builder()
                .id(1).build();

        Assert.assertEquals(1, Time1.getId());
    }

    @Test
    public void testGivenATimeWithOfWhenReceiveGetOfThenGiveHisOf() {
        Time Time1 = Time.builder()
                .of("09:00").build();

        Assert.assertEquals("09:00", Time1.getOf());
    }

    @Test
    public void testGivenATimeWithUntilWhenReceiveGetUntilThenGiveHisUntil() {
        Time Time1 = Time.builder()
                .until("18:00").build();

        Assert.assertEquals("18:00", Time1.getUntil());
    }

    @Test
    public void testGivenATimeWithStoresWhenReceiveSizeGetStoresThenGiveHisSize() {

        List<Store> stores = new ArrayList<>();
        stores.add(mock(Store.class));

        Time Time1 = Time.builder()
                .stores(stores).build();

        Assert.assertEquals(1, Time1.getStores().size());
    }

    @Test
    public void testSetsTime() {
        Time time = Time.builder().build();
        List<Store> stores = new ArrayList<>();
        stores.add(mock(Store.class));

        time.setId(1);
        time.setOf("09:00");
        time.setStores(stores);
        time.setUntil("18:00");

        Assert.assertEquals(1, time.getId());
        Assert.assertEquals("09:00", time.getOf());
        Assert.assertEquals("18:00", time.getUntil());
        Assert.assertEquals(1, stores.size());
    }

}
