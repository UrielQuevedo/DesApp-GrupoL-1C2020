package unq.ar.edu.dessap.grupol.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Store;

@Service
public interface StoreService  {

    Store create(StoreDto storeDto);
}
