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
    public Product create(Long id, ProductDto productDto) {

        Store store = storeRepository.findById(id)
                                        .orElseThrow(NotFound::new);

        Product product = Converter.toProduct(productDto, store);
        em.persist(product);
        return product;
    }
}
