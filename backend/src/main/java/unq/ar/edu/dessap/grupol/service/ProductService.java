package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.model.Product;

import java.util.List;

@Service
public interface ProductService {
    Product create(Long id, ProductDto productDto);

    List<ProductDto> getAll(Long id);

    ProductDto update(Long idProduct, ProductDto productDto);
}
