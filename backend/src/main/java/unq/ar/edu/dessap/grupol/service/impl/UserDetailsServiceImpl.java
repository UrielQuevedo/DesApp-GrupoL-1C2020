package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
@Qualifier("desa.user")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(final String username) {
        // Se accede a UserDao para buscar el usuario y obtener su clave y roles
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
        return this.userBuilder(user.getUsername(), user.getPassword());
    }

    private User userBuilder(String username, String password) {
        return new User(username, password, true, true, true,
                true, new ArrayList<>());
    }
}
