package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.LocationBuilder;

public class LocationTest {

    @Test
    public void testGivenALocationWithLatitudeWhenReceiveGetLatitudeWhenGiveHisLatitude() {
        Location location = LocationBuilder.aLocation()
                .withLatitude(30.00)
                .build();

        Assert.assertEquals(30.00, location.getLatitude(), 0.00);
    }

    @Test
    public void testGivenALocationWithLongitudedeWhenReceiveGetLongitudeWhenGiveHisLongitude() {
        Location location = LocationBuilder.aLocation()
                .withLongitude(30.00)
                .build();

        Assert.assertEquals(30.00, location.getLongitude(), 0.00);
    }

    @Test
    public void testGivenALocationWithAddressWhenReceiveGetAddressWhenGiveHisAddress() {
        Location location = LocationBuilder.aLocation()
                .withAddress("Buenos Aires, Quilmes")
                .build();

        Assert.assertEquals("Buenos Aires, Quilmes", location.getAddress());
    }

    @Test
    public void testLocationSetters() {
        Location location = LocationBuilder.aLocation().build();

        location.setAddress("Buenos Aires, Quilmes");
        location.setLatitude(30.00);
        location.setLongitude(30.00);

        Assert.assertEquals("Buenos Aires, Quilmes", location.getAddress());
        Assert.assertEquals(30.00, location.getLongitude(), 0.00);
        Assert.assertEquals(30.00, location.getLongitude(), 0.00);
    }

}
