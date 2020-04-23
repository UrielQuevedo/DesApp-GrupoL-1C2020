package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Seller;
import unq.ar.edu.dessap.grupol.model.Store;

public class SellerBuilder {

    private long id;
    private String username;
    private String email;
    private String password;
    private Store store;

    public static SellerBuilder aSeller() {
        return new SellerBuilder();
    }

    public Seller build() {
        return new Seller(this.id, this.username, this.email, this.password, this.store);
    }

    public SellerBuilder withId(final long _id) {
        this.id = _id;
        return this;
    }

    public SellerBuilder withUsername(final String _username) {
        this.username = _username;
        return this;
    }

    public SellerBuilder withEmail(final String _email) {
        this.email = _email;
        return this;
    }

    public SellerBuilder withPassword(final String _password) {
        this.password = _password;
        return this;
    }

    public SellerBuilder withStore(Store store) {
        this.store = store;
        return this;
    }
}
