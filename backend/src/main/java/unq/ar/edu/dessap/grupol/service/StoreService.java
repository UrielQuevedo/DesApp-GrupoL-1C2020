package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Store;

import java.util.List;

@Service
public interface StoreService  {

    Store create(Long id, StoreDto storeDto);

    List<Store> getAll();
}