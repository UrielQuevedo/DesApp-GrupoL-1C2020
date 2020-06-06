package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.model.Product;

import java.util.List;

@Service
public interface ProductService {

    ProductDto create(Long idStore, ProductDto productDto);

    List<ProductDto> getAll(Long idStore);

    ProductDto update(Long id, ProductDto productDto);

    ProductDto delete(Long id);
}
