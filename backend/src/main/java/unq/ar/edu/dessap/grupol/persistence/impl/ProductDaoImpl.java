package unq.ar.edu.dessap.grupol.persistence.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.Category;
import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.persistence.ProductDao;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductDaoImpl implements ProductDao {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public List<Product> getAllByIdStore(Long idStore) {
        return productRepository.findAllByIdStore(idStore);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Page<Product> getProductsFiltered(Long idStore, Category category, String search, Pageable pageable) {
        return productRepository.getProductsByStoreIdAndProductNameAndCategory(idStore, search, category, pageable);
    }

    @Override
    public List<Category> getCategoriesFromProductsStore(Long idStore) {
        return productRepository.getProductsCategories(idStore);
    }
}
