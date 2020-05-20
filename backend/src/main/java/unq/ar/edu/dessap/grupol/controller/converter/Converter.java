package unq.ar.edu.dessap.grupol.controller.converter;

import unq.ar.edu.dessap.grupol.controller.dtos.*;
import unq.ar.edu.dessap.grupol.model.*;
import unq.ar.edu.dessap.grupol.service.builder.*;

import java.util.ArrayList;
import java.util.List;

public class Converter {

    public static List<Sector> toListSectors(List<SectorDto> sectorsDtos) {

        List<Sector> sectors = new ArrayList<>();
        sectorsDtos.stream().forEach(sectorDto -> {
                Sector sector = SectorBuilder.aSector()
                                    .withName(sectorDto.getName())
                                    .build();
                sectors.add(sector);
        });
        return sectors;
    }

    public static List<Time> toListTimes(List<TimeDto> timesDtos) {

        List<Time> times = new ArrayList<>();
        timesDtos.stream().forEach(timeDto -> {
            Time time = TimeBuilder.aTime()
                    .withOf(timeDto.getOf())
                    .withUntil(timeDto.getUntil())
                    .build();
            times.add(time);
        });
        return times;
    }

    public static Store toStore(StoreDto storeDto, User user) {

        return StoreBuilder.aStore()
                .withName(storeDto.getName())
                .withSectors(toListSectors(storeDto.getSectors()))
                .withAddress(storeDto.getLocation())
                .withOpenDays(storeDto.getOpenDays())
                .withTimes(toListTimes(storeDto.getTimes()))
                .withPayments(storeDto.getPayments())
                .withMaxDistance(storeDto.getMaxDistance())
                .withUser(user)
                .withProducts(new ArrayList<>())
                .build();
    }

    public static StoreDto toStoreDto(Store store) {
        StoreDto storeDto = new StoreDto();
        storeDto.setName(store.getName());
        storeDto.setLocation(store.getLocation());
        storeDto.setMaxDistance(store.getMaxDistance());
        storeDto.setSectors(toSectorsDtos(store.getSectors()));
        storeDto.setOpenDays(store.getOpenDays());
        storeDto.setPayments(store.getPayments());
        storeDto.setTimes(toTimesDtos(store.getTimes()));
        storeDto.setProducts(toProductsDtos(store.getProducts()));
        return storeDto;
    }

    public static List<ProductDto> toProductsDtos(List<Product> products) {
        List<ProductDto> productsDtos = new ArrayList<>();
        products.forEach(product -> productsDtos.add(toProductDto(product)));
        return productsDtos;
    }

    public static ProductDto toProductDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setName(product.getName());
        productDto.setBrand(product.getBrand());
        productDto.setImage_url(product.getImage_url());
        productDto.setPrice(product.getPrice());
        productDto.setStock(product.getStock());
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

    public static List<SectorDto> toSectorsDtos(List<Sector> sectors) {
        List<SectorDto> sectorDtos = new ArrayList<>();
        sectors.forEach(sector -> {
            SectorDto sectorDto = new SectorDto();
            sectorDto.setName(sector.getName());
            sectorDtos.add(sectorDto);
        });
        return sectorDtos;
    }

    public static Product toProduct(ProductDto productDto, Store store) {

        Product product = ProductBuilder.aProduct()
                .withName(productDto.getName())
                .withBrand(productDto.getBrand())
                .withPrice(productDto.getPrice())
                .withStock(productDto.getStock())
                .withImage_url(productDto.getImage_url())
                .withStores(new ArrayList<>())
                .build();

        return product;
    }
}
