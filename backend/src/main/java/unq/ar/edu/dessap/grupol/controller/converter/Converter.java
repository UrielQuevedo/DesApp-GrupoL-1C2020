package unq.ar.edu.dessap.grupol.controller.converter;

import unq.ar.edu.dessap.grupol.controller.dtos.SectorDto;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.controller.dtos.TimeDto;
import unq.ar.edu.dessap.grupol.model.Sector;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.model.Time;
import unq.ar.edu.dessap.grupol.service.builder.SectorBuilder;
import unq.ar.edu.dessap.grupol.service.builder.StoreBuilder;
import unq.ar.edu.dessap.grupol.service.builder.TimeBuilder;

import java.util.ArrayList;
import java.util.List;

public class Converter {

    public static List<Sector> toListSectors(List<SectorDto> sectorsDtos) {

        List<Sector> sectors = new ArrayList<>();
        sectorsDtos.stream().forEach(sectorDto -> {
                Sector sector = SectorBuilder.aSector()
                                    .withName(sectorDto.getName())
                                    .build();
                sectors.add(sector);
        });
        return sectors;
    }

    public static List<Time> toListTimes(List<TimeDto> timesDtos) {

        List<Time> times = new ArrayList<>();
        timesDtos.stream().forEach(timeDto -> {
            Time time = TimeBuilder.aTime()
                    .withOf(timeDto.getOf())
                    .withUntil(timeDto.getUntil())
                    .build();
            times.add(time);
        });
        return times;
    }

    public static Store toStore(StoreDto storeDto) {

        return StoreBuilder.aStore()
                .withName(storeDto.getName())
                .withSectors(toListSectors(storeDto.getSectors()))
                .withAddress(storeDto.getLocation())
                .withOpenDays(storeDto.getOpenDays())
                .withTimes(toListTimes(storeDto.getTimes()))
                .withPayments(storeDto.getPayments())
                .withMaxDistance(storeDto.getMaxDistance())
                .build();
    }

}
