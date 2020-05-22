package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.service.ProductService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/stores")
@Component
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping(value = "/{idStore}/products")
    public ResponseEntity<ProductDto> create(@PathVariable("idStore") Long idStore,
                                          @RequestBody ProductDto _productDto) {
        ProductDto productDto = productService.create(idStore, _productDto);
        return new ResponseEntity<>(productDto, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{idStore}/products")
    public ResponseEntity<List<ProductDto>> getAll(@PathVariable("idStore") Long idStore) {
        List<ProductDto> productDtos = productService.getAll(idStore);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @PutMapping(value = "/products/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable("id") Long id,
                                             @RequestBody ProductDto productDto) {
        ProductDto productDtoUpdated = productService.update(id, productDto);
        return new ResponseEntity<>(productDtoUpdated, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{idStore}/products/{idProduct}")
    public ResponseEntity<List<ProductDto>> delete(@PathVariable("idStore") Long idStore,
                                             @PathVariable("idProduct") Long idProduct) {
        List<ProductDto> products = productService.delete(idStore, idProduct);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

}