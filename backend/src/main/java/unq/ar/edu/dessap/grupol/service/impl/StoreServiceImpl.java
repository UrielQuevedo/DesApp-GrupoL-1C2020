package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.StoreRepository;
import unq.ar.edu.dessap.grupol.service.StoreService;
import unq.ar.edu.dessap.grupol.service.builder.StoreBuilder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
@Transactional
public class StoreServiceImpl implements StoreService {

    @PersistenceContext
    EntityManager em;

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public Store create(StoreDto storeDto) {

        // verificar que no exista el store mediante el storeRepository

        Store store = StoreBuilder.aStore()
                        .withName(storeDto.getName())
                        .withMaxDistance(storeDto.getMaxDistance())
                        .withAddress(storeDto.getLocation())
                        .build();

       this.em.persist(store);
       return store;
    }

}
