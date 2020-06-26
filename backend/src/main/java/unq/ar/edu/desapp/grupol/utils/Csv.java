package unq.ar.edu.desapp.grupol.utils;

import com.csvreader.CsvReader;
import com.csvreader.CsvWriter;
import unq.ar.edu.dessap.grupol.model.Category;
import unq.ar.edu.dessap.grupol.model.Product;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Csv {

    public static void exportCSV(List<Product> products) throws IOException {
        String fileName = "Products.csv"; // Nombre del archivo
        boolean exists = new File(fileName).exists(); // Verifica si exists

        // Si exists un archivo llamado asi lo borra
        if (exists) {
            File fileProducts = new File(fileName);
            fileProducts.delete();
        }

        try {
            // Crea el archivo
            CsvWriter outputCSV = new CsvWriter(new FileWriter(fileName, true), ',');

            // Datos para identificar las columnas
            outputCSV.write("Name");
            outputCSV.write("Brand");
            outputCSV.write("Price");
            outputCSV.write("Stock");
            outputCSV.write("Category");
            outputCSV.write("Image_url");

            outputCSV.endRecord(); // Deja de escribir en el archivo

            // Recorremos la lista y lo insertamos en el archivo
            for (Product product : products) {
                outputCSV.write(product.getName());
                outputCSV.write(product.getBrand());
                outputCSV.write(String.valueOf(product.getPrice()));
                outputCSV.write(String.valueOf(product.getStock()));
                outputCSV.write(product.getCategory().toString());
                outputCSV.write(product.getImage_url());

                outputCSV.endRecord(); // Deja de escribir en el archivo
            }

            outputCSV.close(); // Cierra el archivo

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static List<Product> importCSV() {
        try {
            List<Product> products = new ArrayList<Product>(); // Lista donde guardaremos los datos del archivo

            CsvReader readProducts = new CsvReader("Products.csv");
            readProducts.readHeaders();

            // Mientras haya lineas obtenemos los datos del archivo
            while (readProducts.readRecord()) {
                String name = readProducts.get(0);
                String brand = readProducts.get(1);
                double price = Double.parseDouble(readProducts.get(2));
                int stock = Integer.parseInt(readProducts.get(3));
                Category category = Category.parse(readProducts.get(4));
                String image_url = readProducts.get(5);

                Product product = Product.builder()
                        .name(name)
                        .brand(brand)
                        .price(price)
                        .stock(stock)
                        .category(category)
                        .image_url(image_url)
                        .build();

                products.add(product); // Añade la informacion a la lista
            }

            readProducts.close(); // Cierra el archivo
            return products;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
