package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.SectorBuilder;
import unq.ar.edu.dessap.grupol.service.builder.TimeBuilder;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;

public class TimeTest {

    @Test
    public void testGivenATimeWithIdWhenReceiveGetIdThenGiveHisId() {
        Time Time1 = TimeBuilder.aTime()
                .withId(1).build();

        Assert.assertEquals(1, Time1.getId());
    }

    @Test
    public void testGivenATimeWithOfWhenReceiveGetOfThenGiveHisOf() {
        Time Time1 = TimeBuilder.aTime()
                .withOf("09:00").build();

        Assert.assertEquals("09:00", Time1.getOf());
    }

    @Test
    public void testGivenATimeWithUntilWhenReceiveGetUntilThenGiveHisUntil() {
        Time Time1 = TimeBuilder.aTime()
                .withUntil("18:00").build();

        Assert.assertEquals("18:00", Time1.getUntil());
    }

    @Test
    public void testGivenATimeWithStoresWhenReceiveSizeGetStoresThenGiveHisSize() {

        List<Store> stores = new ArrayList<>();
        stores.add(mock(Store.class));

        Time Time1 = TimeBuilder.aTime()
                .withStores(stores).build();

        Assert.assertEquals(1, Time1.getStores().size());
    }

}
