package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.controller.exception.NotFound;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.persistence.ProductDao;
import unq.ar.edu.dessap.grupol.persistence.StoreDao;
import unq.ar.edu.dessap.grupol.service.ProductService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDao productDao;

    @Autowired
    private StoreDao storeDao;

    @Override
    public Product create(Long idStore, ProductDto productDto) {

        Store store = storeDao
                        .findById(idStore)
                        .orElseThrow(NotFound::new);

        Product product = Converter.toProduct(productDto, store);
        store.addProduct(product);
        productDao.save(product);
        return product;
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
                            .orElseThrow(NotFound::new);

        product.setName(productDto.getName());
        product.setBrand(productDto.getBrand());
        product.setImage_url(productDto.getImage_url());
        product.setStock(productDto.getStock());
        product.setPrice(productDto.getPrice());
        productDao.save(product);
        return productDto;
    }

    @Override
    public List<ProductDto> delete(Long idStore, Long idProduct) {

        Store store = storeDao.findById(idStore)
                        .orElseThrow(NotFound::new);

        Product product = productDao.findById(idProduct)
                            .orElseThrow(NotFound::new);

        List<Product> products = store.getProducts().stream().filter(p -> p.getId() != product.getId())
                                        .collect(Collectors.toList());
        store.setProducts(products);
        productDao.deleteById(product.getId());
        storeDao.save(store);
        return Converter.toProductsDtos(products);
    }

}
