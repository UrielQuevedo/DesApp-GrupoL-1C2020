package unq.ar.edu.dessap.grupol.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.service.StoreService;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Component
public class StoreController {

    @Autowired
    private StoreService storeService;

    @PostMapping(value = "/users/{id}/stores")
    public ResponseEntity<Store> create(@PathVariable("id") Long id, @RequestBody StoreDto storeDto) {
        Store store = storeService.create(id, storeDto);
        return new ResponseEntity<>(store, HttpStatus.CREATED);
    }

    @GetMapping(value = "/stores/{id}")
    public ResponseEntity<StoreDto> getById(@PathVariable("id") Long id) {
        StoreDto storeDto = storeService.getById(id);
        return new ResponseEntity<>(storeDto, HttpStatus.OK);
    }

    @GetMapping(value = "/{idUser}/stores")
    public ResponseEntity<StoreDto> getByUserId(@PathVariable("idUser") Long idUser) {
        StoreDto storeDto = storeService.getByUserId(idUser);
        return new ResponseEntity<>(storeDto, HttpStatus.OK);
    }

    @GetMapping(value = "/stores")
    public ResponseEntity<List<StoreDto>> getAll() {
        List<StoreDto> storesDtos = storeService.getAll();
        return new ResponseEntity<>(storesDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/stores/nearby")
    public ResponseEntity<List<Store>> getStoresNearby(@RequestBody Location location) {
        try {
            List<Store> storesNearby = storeService.getStoresNearby(location);
            return new ResponseEntity<>(storesNearby, HttpStatus.OK);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @GetMapping(value = "/stores/filter/{name}")
    public ResponseEntity<List<Store>> getStoresFilter(@PathVariable("name") String name) {
        return new ResponseEntity<List<Store>>(storeService.getFiltered(name), HttpStatus.OK);
    }

}
