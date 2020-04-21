package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import unq.ar.edu.dessap.grupol.service.BuyerService;
import unq.ar.edu.dessap.grupol.service.builder.BuyerBuilder;
import unq.ar.edu.dessap.grupol.service.impl.BuyerServiceImpl;

public class BuyerTest {

    @Test
    public void testGivenABuyerWithUserNameAndOtherBuyerWithUsernameWhenTheyRecieveGetUsernameThenTheyGiveTheirUsernames() {
        Buyer buyer1 = BuyerBuilder.aBuyer()
                        .withUsername("buyer1").build();

        Buyer buyer2 = BuyerBuilder.aBuyer()
                .withUsername("buyer2").build();

        Assert.assertEquals("buyer1", buyer1.getUsername());
        Assert.assertEquals("buyer2", buyer2.getUsername());
    }

    @Test
    public void testGivenABuyerWithPasswordAndOtherBuyerWithPasswordWhenTheyRecieveGetPasswordThenTheyGiveTheirPasswords() {
        Buyer buyer1 = BuyerBuilder.aBuyer()
                .withPassword("password_hashed_1").build();

        Buyer buyer2 = BuyerBuilder.aBuyer()
                .withPassword("password_hashed_2").build();

        Assert.assertEquals("password_hashed_1", buyer1.getPassword());
        Assert.assertEquals("password_hashed_2", buyer2.getPassword());
    }

    @Test
    public void testGivenABuyerWithIdAndOtherBuyerWithIdWhenTheyRecieveGetIdThenTheyGiveTheirIds() {
        Buyer buyer1 = BuyerBuilder.aBuyer()
                .withId(1).build();

        Buyer buyer2 = BuyerBuilder.aBuyer()
                .withId(2).build();

        Assert.assertEquals(1, buyer1.getId());
        Assert.assertEquals(2, buyer2.getId());
    }

    @Test
    public void testGivenABuyerWithEmailAndOtherBuyerWithEmailWhenTheyRecieveGetEmailThenTheyGiveTheirEmails() {
        Buyer buyer1 = BuyerBuilder.aBuyer()
                .withEmail("buyer1@compras.en.casa").build();

        Buyer buyer2 = BuyerBuilder.aBuyer()
                .withEmail("buyer2@compras.en.casa").build();

        Assert.assertEquals("buyer1@compras.en.casa", buyer1.getEmail());
        Assert.assertEquals("buyer2@compras.en.casa", buyer2.getEmail());
    }

    @Test
    public void testSetterBuyer() {
        Buyer buyer1 = BuyerBuilder.aBuyer().build();
        buyer1.setEmail("buyer1@compras.en.casa");
        buyer1.setUsername("buyer1");
        buyer1.setId(1);
        buyer1.setPassword("hashed");

        Assert.assertEquals(1, buyer1.getId());
        Assert.assertEquals("buyer1", buyer1.getUsername());
        Assert.assertEquals("hashed", buyer1.getPassword());
        Assert.assertEquals("buyer1@compras.en.casa", buyer1.getEmail());
    }

    @Autowired
    BuyerService buyerService = new BuyerServiceImpl();

    @Test
    public void testBuyer() {
        buyerService.create("pepe","facil","pepe@gmail.com");
    }

}
