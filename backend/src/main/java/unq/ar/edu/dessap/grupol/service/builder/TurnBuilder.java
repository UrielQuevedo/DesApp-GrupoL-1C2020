package unq.ar.edu.dessap.grupol.service.builder;

import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.model.Turn;
import unq.ar.edu.dessap.grupol.model.User;

import java.time.LocalDateTime;

public class TurnBuilder {

    private long id;
    private Store store;
    private User user;
    private LocalDateTime date;

    public static TurnBuilder aTurn() {
        return new TurnBuilder();
    }

    public Turn build() {
        return new Turn(this.id, this.store, this.user, this.date);
    }

    public TurnBuilder withId(final long id) {
        this.id = id;
        return this;
    }

    public TurnBuilder withStore(Store store) {
        this.store = store;
        return this;
    }

    public TurnBuilder withUser(User user) {
        this.user = user;
        return this;
    }

    public TurnBuilder withLocalDateTime(LocalDateTime localDateTime) {
        this.date = localDateTime;
        return this;
    }
}
