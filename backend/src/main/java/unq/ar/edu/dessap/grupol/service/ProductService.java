package unq.ar.edu.dessap.grupol.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.model.Category;
import unq.ar.edu.dessap.grupol.model.Product;

import java.util.List;
import java.util.Optional;

@Service
public interface ProductService {

    ProductDto create(Long idStore, ProductDto productDto);

    List<ProductDto> getAll(Long idStore);

    ProductDto update(Long id, ProductDto productDto);

    ProductDto delete(Long id);

    Page<Product> getProductsFiltered(Long idStore, Category category, Optional<String> search, Pageable pageable);

    List<Category> getCategoriesFromProductStore(Long idStore);
}
