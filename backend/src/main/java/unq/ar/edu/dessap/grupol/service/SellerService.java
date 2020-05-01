package unq.ar.edu.dessap.grupol.service;

import org.springframework.stereotype.Service;
import unq.ar.edu.dessap.grupol.controller.dtos.UserDto;
import unq.ar.edu.dessap.grupol.model.Seller;

@Service
public interface SellerService {
    Seller create(UserDto userDto);
}
