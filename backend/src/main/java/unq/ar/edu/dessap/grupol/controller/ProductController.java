package unq.ar.edu.dessap.grupol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.controller.dtos.StoreDto;
import unq.ar.edu.dessap.grupol.model.Category;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.service.ProductService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/stores")
@Component
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
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

    @GetMapping(value = "/{idStore}/products/{category}")
    public ResponseEntity<Page<Product>> getProductsFiltered(@PathVariable("idStore") Long idStore,
                                                             @PathVariable("category") Category category,
                                                             @RequestParam Optional<String> search,
                                                             Pageable pageable) {
        return new ResponseEntity<>(productService.getProductsFiltered(idStore, category, search, pageable), HttpStatus.OK);
    }

    @PutMapping(value = "/products/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable("id") Long id,
                                             @RequestBody ProductDto productDto) {
        ProductDto productDtoUpdated = productService.update(id, productDto);
        return new ResponseEntity<>(productDtoUpdated, HttpStatus.OK);
    }

    @DeleteMapping(value = "/products/{id}")
    public ResponseEntity<ProductDto> delete(@PathVariable("id") Long id) {
        ProductDto productoDto = productService.delete(id);
        return new ResponseEntity<>(productoDto, HttpStatus.OK);
    }

}