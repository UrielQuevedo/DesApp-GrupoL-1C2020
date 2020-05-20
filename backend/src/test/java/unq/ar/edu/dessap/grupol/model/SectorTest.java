package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.SectorBuilder;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;

public class SectorTest {

    @Test
    public void testGivenASectorWithIdWhenReceiveGetIdThenGiveHisId() {
        Sector Sector1 = SectorBuilder.aSector()
                        .withId(1).build();

        Assert.assertEquals(1, Sector1.getId());
    }

    @Test
    public void testGivenASectorWithNameWhenReceiveGetNameThenGiveHisName() {
        Sector Sector1 = SectorBuilder.aSector()
                .withName("empresarial").build();

        Assert.assertEquals("empresarial", Sector1.getName());
    }

    @Test
    public void testGivenASectorWithStoresWhenReceiveSizeGetStoresThenGiveTheSizeFromTheStores() {

        List<Store> stores = new ArrayList<>();
        stores.add(mock(Store.class));

        Sector Sector1 = SectorBuilder.aSector()
                .withStores(stores).build();

        Assert.assertEquals(1, Sector1.getStores().size());
    }

    @Test
    public void TestSetterSector() {
        Sector sector = SectorBuilder.aSector().build();
        List<Store> stores = new ArrayList<>();
        stores.add(mock(Store.class));

        sector.setId(1);
        sector.setName("Farmacia");
        sector.setStores(stores);

        Assert.assertEquals(1, sector.getId());
        Assert.assertEquals("Farmacia", sector.getName());
        Assert.assertEquals(1, sector.getStores().size());
    }

}
