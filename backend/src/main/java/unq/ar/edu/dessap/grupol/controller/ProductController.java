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

    @PostMapping(value = "/{id}/products")
    public ResponseEntity<Product> create(@PathVariable("id") Long id,
                                          @RequestBody ProductDto productDto) {
        Product product = productService.create(id, productDto);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}/products")
    public ResponseEntity<List<ProductDto>> getAll(@PathVariable("id") Long id) {
        List<ProductDto> productDtos = productService.getAll(id);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

}