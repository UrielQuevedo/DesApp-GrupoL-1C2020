package unq.ar.edu.dessap.grupol.controller.dtos;

import unq.ar.edu.dessap.grupol.model.Location;

public class StoreDto {

    private String name;
    private Location location;
    private Double maxDistance;

    public Double getMaxDistance() {
        return maxDistance;
    }

    public Location getLocation() {
        return location;
    }

    public String getName() {
        return name;
    }

}
