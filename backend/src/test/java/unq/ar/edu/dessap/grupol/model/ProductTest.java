package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.ProductBuilder;

public class ProductTest {
    @Test
    public void testGivenAProductWithNameAndOtherProductWithNameWhenTheyRecieveGetNameThenTheyGiveTheirNames() {
        Product product1 = ProductBuilder.aProduct()
                .withName("product1").build();
        Product product2 = ProductBuilder.aProduct()
                .withName("product2").build();

        Assert.assertEquals("product1", product1.getName());
        Assert.assertEquals("product2", product2.getName());
    }

    @Test
    public void testGivenAProductWithBrandAndOtherProductWithBrandWhenTheyRecieveGetBrandThenTheyGiveTheirBrands() {
        Product product1 = ProductBuilder.aProduct()
                .withBrand("milka").build();
        Product product2 = ProductBuilder.aProduct()
                .withBrand("block").build();

        Assert.assertEquals("milka", product1.getBrand());
        Assert.assertEquals("block", product2.getBrand());
    }

    @Test
    public void testGivenAProductWithStockAndOtherProductWithStockWhenTheyRecieveGetStockThenTheyGiveTheirStocks() {
        Product product1 = ProductBuilder.aProduct()
                .withStock(1).build();
        Product product2 = ProductBuilder.aProduct()
                .withStock(2).build();

        Assert.assertEquals(1, product1.getStock());
        Assert.assertEquals(2, product2.getStock());
    }

    @Test
    public void testGivenAProductWithImage_urlAndOtherProductWithImage_urlWhenTheyRecieveGetImage_urlThenTheyGiveTheirImage_urls() {
        Product product1 = ProductBuilder.aProduct()
                .withImage_url("image1.com").build();
        Product product2 = ProductBuilder.aProduct()
                .withImage_url("image2.com").build();

        Assert.assertEquals("image1.com", product1.getImage_url());
        Assert.assertEquals("image2.com", product2.getImage_url());
    }

    @Test
    public void testGivenAProductWithPriceAndOtherProductWithPriceWhenTheyRecieveGetPriceThenTheyGiveTheirPrices() {
        Product product1 = ProductBuilder.aProduct()
                .withPrice(300.00).build();
        Product product2 = ProductBuilder.aProduct()
                .withPrice(200.00).build();

        Assert.assertEquals(300.00, product1.getPrice(), 00.1);
        Assert.assertEquals(200.00, product2.getPrice(), 00.1);
    }

    @Test
    public void testSetterProduct() {
        Product product = ProductBuilder.aProduct().build();

        product.setBrand("milka");
        product.setImage_url("image1.com");
        product.setName("chocolate");
        product.setPrice(80.00);
        product.setStock(30);

        Assert.assertEquals("milka", product.getBrand());
        Assert.assertEquals("image1.com", product.getImage_url());
        Assert.assertEquals("chocolate", product.getName());
        Assert.assertEquals(80.00, product.getPrice(), 00.1);
        Assert.assertEquals(30, product.getStock());
    }
}
