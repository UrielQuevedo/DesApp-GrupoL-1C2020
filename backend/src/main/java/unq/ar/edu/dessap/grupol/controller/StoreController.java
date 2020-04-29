package unq.ar.edu.dessap.grupol.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.service.StoreService;

@RestController
@RequestMapping(value = "/api/stores")
@Component
public class StoreController {

    @Autowired
    private StoreService storeService;

    @RequestMapping(
            method = RequestMethod.POST,
            produces = "application/json"
    )
    public ResponseEntity<Store> create(@RequestBody StoreDto storeDto) {
        Store store = storeService.create(storeDto);

        return new ResponseEntity<>(store, HttpStatus.CREATED);
    }


}
