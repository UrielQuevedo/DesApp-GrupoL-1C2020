package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Location;

public class LocationBuilder {
    private Double latitude;
    private Double longitude;
    private String address;

    public static LocationBuilder aLocation() { return new LocationBuilder(); }
    public Location build() { return new Location(this.latitude, this.longitude, this.address); }

    public LocationBuilder withLatitude(final Double _latitude) {
        this.latitude = _latitude;
        return this;
    }

    public LocationBuilder withLongitude(final Double _longitude) {
        this.longitude = _longitude;
        return this;
    }

    public LocationBuilder withAddress(final String _address) {
        this.address = _address;
        return this;
    }
}
