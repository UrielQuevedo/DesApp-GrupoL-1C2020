package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.StoreBuilder;

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

        Assert.assertEquals("store1", store.getAddress());
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

   /* @Test
    public void testGivenAStoreWithOneSectorWhenReceiveGetSectorsThenGiveTheirSectors() {
        Store store = StoreBuilder.aStore()
                .withMaxDistance(new Double(100.1)).build();

        Assert.assertEquals(new Double(100.1), store.getMaxDistance());
    } */

}
