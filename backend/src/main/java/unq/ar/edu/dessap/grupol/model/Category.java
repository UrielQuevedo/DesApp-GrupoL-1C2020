package unq.ar.edu.dessap.grupol.model;

public enum Category {
    BEBIDAS,
    GALLETITAS,
    FIAMBRE,
    FIDEOS;

    public static Category parse(String text) {
        if (BEBIDAS.name().equalsIgnoreCase(text)) {
            return BEBIDAS;
        }
        if (GALLETITAS.name().equalsIgnoreCase(text)) {
            return GALLETITAS;
        }
        if (FIAMBRE.name().equalsIgnoreCase(text)) {
            return FIAMBRE;
        }
        else {
            return FIDEOS;
        }
    }

}
