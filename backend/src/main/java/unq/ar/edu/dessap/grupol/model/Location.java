package unq.ar.edu.dessap.grupol.model;

import javax.persistence.Embeddable;

@Embeddable
public class Location {
    private Double latitude;
    private Double longitude;
    private String address;

    public Double getLongitude() {
        return this.longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return this.latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
