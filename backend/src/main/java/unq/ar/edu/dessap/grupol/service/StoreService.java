package unq.ar.edu.dessap.grupol.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.*;

import java.util.List;
import java.util.Optional;

@Service
public interface StoreService  {

    Store create(Long id, StoreDto storeDto);

    List<StoreDto> getAll();

    StoreDto getById(Long id);

    List<Store> getStoresNearby(Location location);

    StoreDto getByUserId(Long idUser);

    Page<Store> getFilteredByNameAndPayment(Optional<String> name, Optional<Payment> payment, Pageable pageable);

    Page<Store> getStoresFiltered(Sector category, Optional<String> search, Optional<Payment> payment, Pageable pageable);

    Page<Store> getStoresThatHaveOffer(Optional<String> search, Optional<Payment> payment, Pageable pageable);

    List<Category> getCategoriesFromStore(Long idStore);
}
