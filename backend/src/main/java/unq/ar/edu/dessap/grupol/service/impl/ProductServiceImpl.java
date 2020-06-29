package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.controller.exception.NotFound;
import unq.ar.edu.dessap.grupol.controller.exception.ProductNotFoundException;
import unq.ar.edu.dessap.grupol.model.Category;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.persistence.ProductDao;
import unq.ar.edu.dessap.grupol.persistence.StoreDao;
import unq.ar.edu.dessap.grupol.service.ProductService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDao productDao;

    @Autowired
    private StoreDao storeDao;

    @Override
    public ProductDto create(Long idStore, ProductDto productDto) {

        Store store = storeDao
                .findById(idStore)
                .orElseThrow(() -> new NotFound());

        Product product = Converter.toProduct(productDto, store);
        store.addProduct(product);
        productDao.save(product);
        productDto.setId(product.getId());
        return productDto;
    }

    @Override
    public List<ProductDto> getAll(Long idStore) {

        List<Product> products = productDao.getAllByIdStore(idStore);
        return Converter.toProductsDtos(products);
    }

    @Override
    public ProductDto update(Long id, ProductDto productDto) {

        Product product = productDao
                .findById(id)
                .orElseThrow(() -> new NotFound());

        productDto.setId(product.getId());
        product.setName(productDto.getName());
        product.setBrand(productDto.getBrand());
        product.setImage_url(productDto.getImage_url());
        product.setStock(productDto.getStock());
        product.setPrice(productDto.getPrice());
        product.setCategory(productDto.getCategory());
        productDao.save(product);
        return productDto;
    }

    @Override
    public ProductDto delete(Long id) {

        Product product = productDao.findById(id)
                .orElseThrow(() -> new NotFound());

        productDao.deleteById(id);
        return Converter.toProductDto(product);
    }

    @Override
    public Page<Product> getProductsFiltered(Long idStore, Category category, Optional<String> search, Pageable pageable) {
        return productDao.getProductsFiltered(idStore, category, search.orElse(""), pageable);
    }

    @Override
    public boolean exists(String _ids) {
        List<Long> ids = new ArrayList<String>(Arrays.asList(_ids.split(",")))
                .stream().map(s -> Long.parseLong(s)).collect(Collectors.toList());

        ids.forEach(id -> get(id));
        return true;
    }

    @Override
    public ProductDto get(Long id) {
        Product product = productDao.findById(id)
                            .orElseThrow(() -> new ProductNotFoundException(id));

        return Converter.toProductDto(product);
    }
}
