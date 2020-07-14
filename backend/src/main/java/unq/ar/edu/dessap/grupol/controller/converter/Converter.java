package unq.ar.edu.dessap.grupol.controller.converter;

import unq.ar.edu.dessap.grupol.controller.dtos.*;
import unq.ar.edu.dessap.grupol.model.*;

import java.util.ArrayList;
import java.util.List;

public class Converter {

    public static List<Time> toListTimes(List<TimeDto> timesDtos) {

        List<Time> times = new ArrayList<>();
        timesDtos.stream().forEach(timeDto -> {
            Time time = Time.builder()
                    .of(timeDto.getOf())
                    .until(timeDto.getUntil())
                    .build();
            times.add(time);
        });
        return times;
    }

    public static Store toStore(StoreDto storeDto) {

        return Store.builder()
                .name(storeDto.getName())
                .sector(storeDto.getSector())
                .location(storeDto.getLocation())
                .openDays(storeDto.getOpenDays())
                .times(Converter.toListTimes(storeDto.getTimes()))
                .payments(storeDto.getPayments())
                .maxDistance(storeDto.getMaxDistance())
                .products(new ArrayList<>())
                .build();
    }

    public static StoreDto toStoreDto(Store store) {
        StoreDto storeDto = new StoreDto();
        storeDto.setId(store.getId());
        storeDto.setName(store.getName());
        storeDto.setLocation(store.getLocation());
        storeDto.setMaxDistance(store.getMaxDistance());
        storeDto.setSector(store.getSector());
        storeDto.setOpenDays(store.getOpenDays());
        //storeDto.setPayments(store.getPayments());
        storeDto.setTimes(toTimesDtos(store.getTimes()));
        storeDto.setProducts(toProductsDtos(store.getProducts()));
        storeDto.setOpen(store.getIsOpen());
        storeDto.setTickets(store.getTickets());
        return storeDto;
    }

    public static List<ProductDto> toProductsDtos(List<Product> products) {
        List<ProductDto> productsDtos = new ArrayList<>();
        products.forEach(product -> productsDtos.add(toProductDto(product)));
        return productsDtos;
    }

    public static ProductDto toProductDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setBrand(product.getBrand());
        productDto.setImage_url(product.getImage_url());
        productDto.setPrice(product.getPrice());
        productDto.setStock(product.getStock());
        productDto.setCategory(product.getCategory());
        return productDto;
    }

    public static List<TimeDto> toTimesDtos(List<Time> times) {
        List<TimeDto> timesDtos = new ArrayList<>();
        times.forEach(time -> {
            TimeDto timeDto = new TimeDto();
            timeDto.setOf(time.getOf());
            timeDto.setUntil(time.getUntil());
            timesDtos.add(timeDto);
        });
        return timesDtos;
    }

    public static Product toProduct(ProductDto productDto, Store store) {

        Product product = Product.builder()
                .name(productDto.getName())
                .brand(productDto.getBrand())
                .price(productDto.getPrice())
                .stock(productDto.getStock())
                .image_url(productDto.getImage_url())
                .category(productDto.getCategory())
                .store(store)
                .build();

        return product;
    }

    public static ShoppingCartDto toShoppingCartDto(ShoppingCart shoppingCart) {
        return ShoppingCartDto.builder()
                .id(shoppingCart.getId())
                .orders(shoppingCart.getOrders())
                .totalPrice(shoppingCart.getTotalPrice())
                .totalQuantity(shoppingCart.getTotalQuantity())
                .build();
    }

    public static UserSocialDto toUserSocialDto(User user) {
        return UserSocialDto.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }
}
