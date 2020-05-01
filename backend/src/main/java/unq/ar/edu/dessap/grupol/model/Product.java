package unq.ar.edu.dessap.grupol.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, name = "product_id")
    private long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private int stock;
    @Column(nullable = false)
    private double price;
    private String image_url;
    @ManyToMany(mappedBy = "products")
    private List<Store> stores;

    public Product(){}

    public Product(String _name, String _brand, int _stock, double _price, String _image_url,
                    List<Store> _stores) {
        this.setBrand(_brand);
        this.setImage_url(_image_url);
        this.setName(_name);
        this.setStock(_stock);
        this.setPrice(_price);
        this.setStores(_stores);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public List<Store> getStores() {
        return stores;
    }

    public void setStores(List<Store> stores) {
        this.stores = stores;
    }
}
