package unq.ar.edu.dessap.grupol.service.impl;

import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.service.GeoDistanceService;

public class GeoDistanceServiceImpl implements GeoDistanceService {

    @Override
    public Double calculateMaxDistanceBetweenTwoCoordinates(Double start_latitude, Double start_longitude,
                                                            Double end_latitude, Double end_longitude)
    {
        double earthRadius = 6371;
        double sindLat = Math.sin(Math.toRadians(end_latitude - start_latitude) / 2);
        double sindLng = Math.sin(Math.toRadians(end_longitude - start_longitude) / 2);
        double va1 = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)
                * Math.cos(Math.toRadians(start_latitude)) * Math.cos(Math.toRadians(end_latitude));
        double va2 = 2 * Math.atan2(Math.sqrt(va1), Math.sqrt(1 - va1));

        return (double)Math.round((earthRadius * va2) * 100d) / 100d;
    }

    @Override
    public Double calculateMaxDistanceBetweenTwoLocation(Location start_location, Location end_location) {
        return this.calculateMaxDistanceBetweenTwoCoordinates(
                start_location.getLatitude(), start_location.getLongitude(),
                end_location.getLatitude(), end_location.getLongitude()
        );
    }
}
