package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.SellerBuilder;

public class SellerTest {

    @Test
    public void testGivenASellerWithUserNameAndOtherSellerWithUsernameWhenTheyRecieveGetUsernameThenTheyGiveTheirUsernames() {
        Seller seller1 = SellerBuilder.aSeller()
                .withUsername("seller1").build();

        Seller seller2 = SellerBuilder.aSeller()
                .withUsername("seller2").build();

        Assert.assertEquals("seller1", seller1.getUsername());
        Assert.assertEquals("seller2", seller2.getUsername());
    }

    @Test
    public void testGivenASellerWithPasswordAndOtherSellerWithPasswordWhenTheyRecieveGetPasswordThenTheyGiveTheirPasswords() {
        Seller Seller1 = SellerBuilder.aSeller()
                .withPassword("password_hashed_1").build();

        Seller Seller2 = SellerBuilder.aSeller()
                .withPassword("password_hashed_2").build();

        Assert.assertEquals("password_hashed_1", Seller1.getPassword());
        Assert.assertEquals("password_hashed_2", Seller2.getPassword());
    }

    @Test
    public void testGivenASellerWithIdAndOtherSellerWithIdWhenTheyRecieveGetIdThenTheyGiveTheirIds() {
        Seller Seller1 = SellerBuilder.aSeller()
                .withId(1).build();

        Seller Seller2 = SellerBuilder.aSeller()
                .withId(2).build();

        Assert.assertEquals(1, Seller1.getId());
        Assert.assertEquals(2, Seller2.getId());
    }

    @Test
    public void testGivenASellerWithEmailAndOtherSellerWithEmailWhenTheyRecieveGetEmailThenTheyGiveTheirEmails() {
        Seller Seller1 = SellerBuilder.aSeller()
                .withEmail("Seller1@compras.en.casa").build();

        Seller Seller2 = SellerBuilder.aSeller()
                .withEmail("Seller2@compras.en.casa").build();

        Assert.assertEquals("Seller1@compras.en.casa", Seller1.getEmail());
        Assert.assertEquals("Seller2@compras.en.casa", Seller2.getEmail());
    }

    @Test
    public void testSetterSeller() {
        Seller Seller1 = SellerBuilder.aSeller().build();
        Seller1.setEmail("Seller1@compras.en.casa");
        Seller1.setUsername("Seller1");
        Seller1.setId(1);
        Seller1.setPassword("hashed");

        Assert.assertEquals(1, Seller1.getId());
        Assert.assertEquals("Seller1", Seller1.getUsername());
        Assert.assertEquals("hashed", Seller1.getPassword());
        Assert.assertEquals("Seller1@compras.en.casa", Seller1.getEmail());
    }

}
