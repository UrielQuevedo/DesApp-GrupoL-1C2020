package unq.ar.edu.dessap.grupol.persistence;

import org.springframework.stereotype.Repository;
import unq.ar.edu.dessap.grupol.model.User;

@Repository
public interface UserDao {
    User save(User user);
    User getUserById(long id);
    User getUserByEmail(String email);
}
