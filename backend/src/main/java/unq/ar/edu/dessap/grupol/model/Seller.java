package unq.ar.edu.dessap.grupol.model;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name = "sellers")
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @OneToOne(mappedBy = "seller", cascade = CascadeType.ALL)
    private Store store;

    public Seller() {}

    public Seller(long _id, String _username, String _email, String _password, Store _store) {
        this.setId(_id);
        this.setUsername(_username);
        this.setEmail(_email);
        this.setPassword(_password);
        this.setStore(_store);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Store getStore() {
        return this.store;
   }

    public void setStore(Store store) {
        this.store = store;
    }

}
