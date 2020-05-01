package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.model.Product;

@Service
public interface ProductService {
    Product create(Long id, ProductDto productDto);
}
