package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Buyer;
import unq.ar.edu.dessap.grupol.model.History;

public class BuyerBuilder {

    private long id;
    private String username;
    private String email;
    private String password;
    private History history;

    public static BuyerBuilder aBuyer() {
        return new BuyerBuilder();
    }

    public Buyer build() {
        return new Buyer(this.id, this.username, this.email, this.password, this.history);
    }

    public BuyerBuilder withId(final long _id) {
        this.id = _id;
        return this;
    }

    public BuyerBuilder withUsername(final String _username) {
        this.username = _username;
        return this;
    }

    public BuyerBuilder withEmail(final String _email) {
        this.email = _email;
        return this;
    }

    public BuyerBuilder withPassword(final String _password) {
        this.password = _password;
        return this;
    }

    public BuyerBuilder withHistory(History history) {
        this.history = history;
        return this;
    }

}
