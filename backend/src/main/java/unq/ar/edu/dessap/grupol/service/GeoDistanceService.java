package unq.ar.edu.dessap.grupol.service;

import unq.ar.edu.dessap.grupol.model.Location;

public interface GeoDistanceService {
    Double calculateMaxDistanceBetweenTwoLocation(Location start_location, Location end_location);
    Double calculateMaxDistanceBetweenTwoCoordinates(Double start_latitude, Double start_longitude, Double end_latitude, Double end_longitude);
}