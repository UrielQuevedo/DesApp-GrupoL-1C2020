package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.Order;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.model.User;

import java.util.List;

public class UserBuilder {

    private long id;
    private String username;
    private String password;
    private String email;
    private String role;
    private List<Order> orders;
    private Location location;
    private Store store;

    public static UserBuilder aUser() {
        return new UserBuilder();
    }

    public User build() {
        return new User(this.id, this.username, this.password, this.email, this.role, this.orders, this.location, this.store);
    }

    public UserBuilder withId(final long id) {
        this.id = id;
        return this;
    }


    public UserBuilder withUsername(final String username) {
        this.username = username;
        return this;
    }

    public UserBuilder withPassword(final String password) {
        this.password = password;
        return this;
    }

    public UserBuilder withEmail(final String email) {
        this.email = email;
        return this;
    }

    public UserBuilder withOrders(final List<Order> orders) {
        this.orders = orders;
        return this;
    }

    public UserBuilder withLocation(final Location location) {
        this.location = location;
        return this;
    }

    public UserBuilder withStore(final Store store) {
        this.store = store;
        return this;
    }

    public UserBuilder withRole(final String role) {
        this.role = role;
        return this;
    }
}
