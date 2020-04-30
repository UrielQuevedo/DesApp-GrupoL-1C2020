package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.StoreRepository;
import unq.ar.edu.dessap.grupol.service.GeoDistanceService;
import unq.ar.edu.dessap.grupol.service.StoreService;
import unq.ar.edu.dessap.grupol.controller.exception.DuplicatedLocationException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private GeoDistanceService geoDistanceService;

    @Override
    public Store create(StoreDto storeDto) {

        Store storedb =
                this.storeRepository
                        .findByLatitudeAndLongitude(storeDto.getLocation().getLatitude(),
                                                    storeDto.getLocation().getLongitude());

        if (storedb != null) {
            throw new DuplicatedLocationException();
        }

        Store store = Converter.toStore(storeDto);
        this.storeRepository.save(store);
        return store;
    }

    @Override
    public List<Store> getStoresNearby(Location location) {
        return storeRepository.findAll()
                .stream()
                .filter(
                        store ->
                                geoDistanceService.calculateMaxDistanceBetweenTwoLocation(location, store.getLocation())
                                > store.getMaxDistance()
                ).collect(Collectors.toList());
    }
}
