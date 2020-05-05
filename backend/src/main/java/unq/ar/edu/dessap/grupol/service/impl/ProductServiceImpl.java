package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.ProductDto;
import unq.ar.edu.dessap.grupol.controller.exception.NotFound;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.ProductRepository;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.StoreRepository;
import unq.ar.edu.dessap.grupol.service.ProductService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public Product create(Long idStore, ProductDto productDto) {

        Store store = storeRepository.findById(idStore)
                .orElseThrow(NotFound::new);

        Product product = Converter.toProduct(productDto, store);
        store.addProduct(product);
        em.persist(product);
        return product;
    }

    @Override
    public List<ProductDto> getAll(Long id) {

        List<Product> products = productRepository.findAllByIdStore(id);
        return Converter.toProductsDtos(products);
    }

    @Override
    public ProductDto update(Long id, ProductDto productDto) {

        Product product = productRepository.findById(id)
                .orElseThrow(NotFound::new);

        product.setName(productDto.getName());
        product.setBrand(productDto.getBrand());
        product.setImage_url(productDto.getImage_url());
        product.setStock(productDto.getStock());
        product.setPrice(productDto.getPrice());
        em.persist(product);
        return productDto;
    }

    @Override
    public List<ProductDto> delete(Long idStore, Long idProduct) {

        Store store = storeRepository.findById(idStore)
                .orElseThrow(NotFound::new);

        Product product = productRepository.findById(idProduct)
                .orElseThrow(NotFound::new);

        List<Product> products = store.getProducts().stream().filter(p -> p.getId() != product.getId())
                                        .collect(Collectors.toList());
        store.setProducts(products);
        productRepository.deleteById(product.getId());
        em.persist(store);
        return Converter.toProductsDtos(products);
    }

}
