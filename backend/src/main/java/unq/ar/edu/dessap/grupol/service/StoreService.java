package unq.ar.edu.dessap.grupol.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.Payment;
import unq.ar.edu.dessap.grupol.model.Sector;
import unq.ar.edu.dessap.grupol.model.Store;

import java.util.List;
import java.util.Optional;

@Service
public interface StoreService  {

    Store create(Long id, StoreDto storeDto);

    List<StoreDto> getAll();

    StoreDto getById(Long id);

    List<Store> getStoresNearby(Location location);

    StoreDto getByUserId(Long idUser);

    List<Store> getFilteredByNameAndPayment(Optional<String> name, Optional<Payment> payment);

    List<Store> getStoresFiltered(Sector category, Optional<String> search, Optional<Payment> payment);

    List<Store> getStoresThatHaveOffer(Optional<String> search, Optional<Payment> payment);
}
