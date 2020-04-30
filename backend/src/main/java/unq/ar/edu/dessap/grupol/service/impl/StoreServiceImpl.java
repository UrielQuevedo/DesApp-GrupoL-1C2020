package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.controller.exception.NotFound;
import unq.ar.edu.dessap.grupol.model.Sector;
import unq.ar.edu.dessap.grupol.model.Seller;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.SellerRepository;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.StoreRepository;
import unq.ar.edu.dessap.grupol.service.StoreService;
import unq.ar.edu.dessap.grupol.controller.exception.DuplicatedLocationException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StoreServiceImpl implements StoreService {

    @PersistenceContext
    EntityManager em;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public Store create(Long id, StoreDto storeDto) {

        Seller seller = this.sellerRepository
                            .findById(id)
                            .orElseThrow(NotFound::new);

        Store storedb =
                this.storeRepository
                        .findByLatitudeAndLongitude(storeDto.getLocation().getLatitude(),
                                                    storeDto.getLocation().getLongitude());

        if (storedb != null) {
            throw new DuplicatedLocationException();
        }

        Store store = Converter.toStore(storeDto, seller);
        this.em.persist(store);
        return store;
    }

    @Override
    public List<Store> getAll() {
/*
        List<Store> results = new ArrayList<>();
        List<Store> stores = this.storeRepository.findAll();
        List<List<Sector>> sectors = stores.stream().map(store -> store.getSectors()).collect(Collectors.toList());
        sectors.forEach(sectorl1 -> {

        });*/
      /*  List<Store> stores = this.storeRepository.findAll().stream()
                                .map(store -> Converter.toSectorsDtos(store.getSectors()))

        */
        return this.storeRepository.findAll();
    }

    @Override
    public StoreDto getById(Long id) {
        Store store = this.storeRepository.findById(id)
                         .orElseThrow(NotFound::new);
        return Converter.toStoreDto(store);
    }

}
