package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.controller.exception.NotFound;
import unq.ar.edu.dessap.grupol.model.*;
import unq.ar.edu.dessap.grupol.persistence.StoreDao;
import unq.ar.edu.dessap.grupol.persistence.UserDao;
import unq.ar.edu.dessap.grupol.service.GeoDistanceService;
import unq.ar.edu.dessap.grupol.service.StoreService;
import unq.ar.edu.dessap.grupol.controller.exception.DuplicatedLocationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreDao storeDao;

    @Autowired
    private GeoDistanceService geoDistanceService;

    @Autowired
    private UserDao userDao;

    @Override
    public Store create(Long id, StoreDto storeDto) {

        User user = userDao.getUserById(id);

        Store storedb = storeDao
                            .findByLatitudeAndLongitude(storeDto.getLocation().getLatitude(),
                                    storeDto.getLocation().getLongitude());

        if (storedb != null) {
            throw new DuplicatedLocationException();
        }

        Store store = Converter.toStore(storeDto);
        user.setStore(store);
        userDao.save(user);
        return store;
    }

    @Override
    public List<StoreDto> getAll() {
        List<StoreDto> storesDtos = new ArrayList<>();
        List<Store> stores = storeDao.getAll();
        stores.forEach(store -> {
            storesDtos.add(Converter.toStoreDto(store));
        });
        return storesDtos;
    }

    @Override
    public StoreDto getById(Long id) {
        Store store = storeDao.findById(id)
                        .orElseThrow(NotFound::new);
        return Converter.toStoreDto(store);
    }

    @Override
    public List<Store> getStoresNearby(Location location) {
    return null;
        //        return storeDao.getAll()
//                .stream()
//                .filter(
//                        store ->
//                                geoDistanceService.calculateMaxDistanceBetweenTwoLocation(location, store.getLocation())
//                                        > store.getMaxDistance()
//                ).collect(Collectors.toList());
    }

    @Override
    public StoreDto getByUserId(Long idUser) {

        User user = userDao.getUserById(idUser);

        return Converter.toStoreDto(user.getStore());
    }

    @Override
    public Page<Store> getFilteredByNameAndPayment(Optional<String> search, Optional<Payment> payment, Pageable pageable) {
        return storeDao.getFilteredByNameAndPayment(search.orElse(""),payment.orElse(null), pageable);
    }

    @Override
    public Page<Store> getStoresFiltered(Optional<Sector> category, Optional<String> search,  Optional<Payment> payment, Pageable pageable) {
        return storeDao.getStoresFiltered(category.orElse(null), search.orElse(""), payment.orElse(null), pageable);
    }

    @Override
    public Page<Store> getStoresThatHaveOffer(Optional<String> search, Optional<Payment> payment, Pageable pageable) {
        return storeDao.getStoresThatHaveOffer(search.orElse(""), payment.orElse(null), pageable);
    }

    @Override
    public List<Category> getCategoriesFromStore(Long idStore) {
        return storeDao.getCategoriesFromStore(idStore);
    }

}

