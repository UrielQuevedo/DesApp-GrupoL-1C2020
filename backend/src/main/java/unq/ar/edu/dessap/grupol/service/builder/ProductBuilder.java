package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Product;
import unq.ar.edu.dessap.grupol.model.Store;

import java.util.List;

public class ProductBuilder {
    private String name;
    private String brand;
    private int stock;
    private double price;
    private String image_url;
    private List<Store> stores;

    public static ProductBuilder aProduct() { return new ProductBuilder(); }

    public Product build() { return new Product(this.name, this.brand, this.stock, this.price, this.image_url, this.stores); }

    public ProductBuilder withName(final String _name) {
        this.name = _name;
        return this;
    }

    public ProductBuilder withPrice(final double _price) {
        this.price = _price;
        return this;
    }

    public ProductBuilder withStock(final int _stock) {
        this.stock = _stock;
        return this;
    }

    public ProductBuilder withBrand(final String _brand) {
        this.brand = _brand;
        return this;
    }

    public ProductBuilder withImage_url(final String _image_url) {
        this.image_url = _image_url;
        return this;
    }

    public ProductBuilder withStores(List<Store> stores) {
        this.stores = stores;
        return this;
    }

}
