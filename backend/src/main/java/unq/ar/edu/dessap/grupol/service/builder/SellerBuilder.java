package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Seller;

public class SellerBuilder {

    private long id;
    private String username;
    private String email;
    private String password;

    public static SellerBuilder aSeller() {
        return new SellerBuilder();
    }

    public Seller build() {
        return new Seller(this.id, this.username, this.email, this.password);
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
}
