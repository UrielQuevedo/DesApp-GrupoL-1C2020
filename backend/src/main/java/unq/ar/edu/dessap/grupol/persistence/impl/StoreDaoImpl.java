package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.persistence.StoreDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.SellerRepository;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.StoreRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class StoreDaoImpl implements StoreDao {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public Store findByLatitudeAndLongitude(Double latitude, Double longitude) {
        return storeRepository.findByLatitudeAndLongitude(latitude, longitude);
    }

    @Override
    public void save(Store store) {
        storeRepository.save(store);
    }

    @Override
    public List<Store> getAll() {
        return storeRepository.findAll();
    }

    @Override
    public Optional<Store> findById(Long id) {
        return storeRepository.findById(id);
    }
}
