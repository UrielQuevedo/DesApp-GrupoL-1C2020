package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Payment;
import unq.ar.edu.dessap.grupol.model.Sector;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.persistence.StoreDao;
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

    @Override
    public List<Store> getFilteredByName(String name) {
        return storeRepository.getStoresFindByNameOrProductsName(name);
    }

    @Override
    public List<Store> getStoresFiltered(Sector category, String search, Payment payment) {
        return storeRepository.getStoresFindByNameAndSectorAndFilter(category, search, payment);
    }
}
