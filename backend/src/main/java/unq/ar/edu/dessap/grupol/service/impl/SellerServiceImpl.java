package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.UserDto;
import unq.ar.edu.dessap.grupol.model.Seller;
import unq.ar.edu.dessap.grupol.persistence.SellerDao;
import unq.ar.edu.dessap.grupol.service.SellerService;

@Service
@Transactional
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerDao sellerDao;

    @Override
    public Seller create(UserDto userDto) {

      /*  Seller sellerWithUsername = sellerRepository.findByUsername(userDto.getUsername());
        Seller sellerWithEmail = sellerRepository.findByEmail(userDto.getEmail());

        if(sellerWithUsername != null) {
            throw new DuplicatedUsernameException();
        }

        if(sellerWithEmail != null) {
            throw new DuplicatedUserEmailException();
        }
        */
        Seller seller = Converter.toSeller(userDto);
        sellerDao.save(seller);
        return seller;
    }

}
