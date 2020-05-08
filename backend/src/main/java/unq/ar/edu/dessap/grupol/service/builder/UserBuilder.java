package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.User;

public class UserBuilder {

    private long id;
    private String username;
    private String password;
    private String email;
    private String role;

    public static UserBuilder aUser() {
        return new UserBuilder();
    }

    public User build() {
        return new User(this.id, this.username, this.password, this.email, this.role);
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

    public UserBuilder withRole(final String role) {
        this.role = role;
        return this;
    }
}
