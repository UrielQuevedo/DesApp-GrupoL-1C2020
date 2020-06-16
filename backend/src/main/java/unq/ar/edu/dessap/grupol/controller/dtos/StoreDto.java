package unq.ar.edu.dessap.grupol.controller.dtos;

import lombok.Getter;
import lombok.Setter;
import unq.ar.edu.dessap.grupol.model.*;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class StoreDto {
    private long id;
    private String name;
    private Location location;
    private Double maxDistance;
    private Sector sector;
    private List<DayOfWeek> openDays = new ArrayList<>();
    private List<Payment> payments;
    private List<TimeDto> times = new ArrayList<>();
    private List<ProductDto> products;
}
