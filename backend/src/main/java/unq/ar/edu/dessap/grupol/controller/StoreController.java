package unq.ar.edu.dessap.grupol.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.service.StoreService;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@Component
public class StoreController {

    @Autowired
    private StoreService storeService;

    @PostMapping(value = "/sellers/{id}/stores")
    public ResponseEntity<Store> create(@PathVariable("id") Long id, @RequestBody StoreDto storeDto) {
        Store store = storeService.create(id, storeDto);
        return new ResponseEntity<>(store, HttpStatus.CREATED);
    }

    @GetMapping(value = "/stores")
    public ResponseEntity<List<StoreDto>> getAll() {
        List<StoreDto> storesDtos = storeService.getAll();
        return new ResponseEntity<>(storesDtos, HttpStatus.OK);
    }

    @GetMapping(value = "/stores/{id}")
    public ResponseEntity<StoreDto> getById(@PathVariable("id") Long id) {
        StoreDto storeDto = storeService.getById(id);
        return new ResponseEntity<>(storeDto, HttpStatus.OK);
    }

}
