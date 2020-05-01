package unq.ar.edu.dessap.grupol.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import unq.ar.edu.dessap.grupol.controller.exception.DuplicatedUsernameException;
import unq.ar.edu.dessap.grupol.controller.converter.Converter;
import unq.ar.edu.dessap.grupol.controller.dtos.UserDto;
import unq.ar.edu.dessap.grupol.controller.exception.DuplicatedUserEmailException;
import unq.ar.edu.dessap.grupol.model.Seller;
import unq.ar.edu.dessap.grupol.persistence.impl.repository.SellerRepository;
import unq.ar.edu.dessap.grupol.service.SellerService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
@Transactional
public class SellerServiceImpl implements SellerService {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public Seller create(UserDto userDto) {

        Seller sellerWithUsername = sellerRepository.findByUsername(userDto.getUsername());
        Seller sellerWithEmail = sellerRepository.findByEmail(userDto.getEmail());

        if(sellerWithUsername != null) {
            throw new DuplicatedUsernameException();
        }

        if(sellerWithEmail != null) {
            throw new DuplicatedUserEmailException();
        }

        Seller seller = Converter.toSeller(userDto);
        em.persist(seller);
        return seller;
    }

}
