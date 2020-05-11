package unq.ar.edu.dessap.grupol.model;

import java.time.LocalDateTime;

public class Turn {

    private long id;
    private Store store;
    private User user;
    private LocalDateTime date;

    public Turn() {}

    public Turn(long id, Store store, User user, LocalDateTime date) {
        this.id = id;
        this.store = store;
        this.user = user;
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

}
