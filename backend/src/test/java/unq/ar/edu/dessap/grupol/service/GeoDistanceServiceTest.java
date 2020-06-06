package unq.ar.edu.dessap.grupol.service;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.service.impl.GeoDistanceServiceImpl;

public class GeoDistanceServiceTest {

    private final GeoDistanceService geoDistanceService = new GeoDistanceServiceImpl();

    @Test
    public void testGivenTheSameCoordinateTheDistanceIsTheSame() {
        Double distance = geoDistanceService.calculateMaxDistanceBetweenTwoCoordinates(-34.706566,-58.277687,-34.706566,-58.277687);
        Assert.assertEquals(0.0, distance, 0.0);
    }

    @Test
    public void testGivenTwoCoordinateTheDistancesBetweenThemIs1Point26Km() {
        Double distance = geoDistanceService.calculateMaxDistanceBetweenTwoCoordinates(-34.706566,-58.277687,-34.698114,-58.286888);
        Assert.assertEquals(1.26, distance, 0.0);
    }

    @Test
    public void testGivenTwoCoordinatesTheDistanceBetweenThemIsEqualIfTheyAreReversed() {
        Double normal_distance = geoDistanceService.calculateMaxDistanceBetweenTwoCoordinates(-34.706566,-58.277687,-34.698114,-58.286888);
        Double reverse_distance = geoDistanceService.calculateMaxDistanceBetweenTwoCoordinates(-34.698114,-58.286888,-34.706566,-58.277687);

        Assert.assertEquals(1.26, normal_distance, 0.0);
        Assert.assertEquals(1.26, reverse_distance, 0.0);
    }

    @Test
    public void testGivenTwoLocationTheDistanceBetweenThemIs6Point30() {
        Location quilmes = Location.builder()
                .latitude(-34.724269)
                .longitude(-58.260797)
                .address("Quilmes")
                .build();

        Location berazategui = Location.builder()
                .latitude(-34.763363)
                .longitude(-58.208780)
                .address("Berazategui")
                .build();

        Double distance = geoDistanceService.calculateMaxDistanceBetweenTwoLocation(quilmes, berazategui);

        Assert.assertEquals(6.30, distance, 0.40);
    }
}
