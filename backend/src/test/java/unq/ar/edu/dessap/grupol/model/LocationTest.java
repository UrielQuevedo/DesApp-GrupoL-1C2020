package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;

public class LocationTest {

    @Test
    public void testGivenALocationWithLatitudeWhenReceiveGetLatitudeWhenGiveHisLatitude() {
        Location location = Location.builder()
                .latitude(30.00)
                .build();

        Assert.assertEquals(30.00, location.getLatitude(), 0.00);
    }

    @Test
    public void testGivenALocationWithLongitudedeWhenReceiveGetLongitudeWhenGiveHisLongitude() {
        Location location = Location.builder()
                .longitude(30.00)
                .build();

        Assert.assertEquals(30.00, location.getLongitude(), 0.00);
    }

    @Test
    public void testGivenALocationWithAddressWhenReceiveGetAddressWhenGiveHisAddress() {
        Location location = Location.builder()
                .address("Buenos Aires, Quilmes")
                .build();

        Assert.assertEquals("Buenos Aires, Quilmes", location.getAddress());
    }

    @Test
    public void testLocationSetters() {
        Location location = Location.builder().build();

        location.setAddress("Buenos Aires, Quilmes");
        location.setLatitude(30.00);
        location.setLongitude(30.00);

        Assert.assertEquals("Buenos Aires, Quilmes", location.getAddress());
        Assert.assertEquals(30.00, location.getLongitude(), 0.00);
        Assert.assertEquals(30.00, location.getLongitude(), 0.00);
    }

    @Test
    public void testLocationEmptyBuilder() {
        Location location1 = new Location();
        Location location2 = Location.builder().build();

        Assert.assertNull(location1.getLongitude());
        Assert.assertNull(location1.getAddress());
        Assert.assertNull(location1.getLatitude());

        Assert.assertNull(location2.getLongitude());
        Assert.assertNull(location2.getAddress());
        Assert.assertNull(location2.getLatitude());

    }

}
