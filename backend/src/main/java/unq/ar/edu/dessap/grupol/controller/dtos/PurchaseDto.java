package unq.ar.edu.dessap.grupol.controller.dtos;

import lombok.Getter;
import unq.ar.edu.dessap.grupol.model.Payment;

@Getter
public class PurchaseDto {
    String turnTime;
    Payment payment;
}
