package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.UserBuilder;

public class UserTest {

    @Test
    public void testGivenAUserWithIdWhenTheyReceiveGetIdThenGiveHisId() {
        User user = UserBuilder.aUser()
                     .withId(1).build();

        Assert.assertEquals(1, user.getId());
    }

    @Test
    public void testGivenAUserWithUsernameWhenTheyReceiveGetIdThenGiveHisUsername() {
        User user = UserBuilder.aUser()
                     .withUsername("daniv").build();

        Assert.assertEquals("daniv", user.getUsername());
    }

    @Test
    public void testGivenAUserWithPasswordWhenTheyReceiveGetPasswordThenGiveHisPassword() {
        User user = UserBuilder.aUser()
                     .withPassword("123").build();

        Assert.assertEquals("123", user.getPassword());
    }

    @Test
    public void testGivenAUserWithEmailWhenTheyReceiveGetEmailThenGiveHisEmail() {
        User user = UserBuilder.aUser()
                    .withEmail("dvillegas@gmail.com").build();

        Assert.assertEquals("dvillegas@gmail.com", user.getEmail());
    }


    @Test
    public void testGivenAUserWithRoleBuyerWhenTheyReceiveGetRoleThenGiveHisRole() {
        User user = UserBuilder.aUser()
                    .withRole("Buyer").build();

        Assert.assertEquals("Buyer", user.getRole());
    }

    @Test
    public void testSetterUser() {
        User user = UserBuilder.aUser().build();

        user.setId(1);
        user.setUsername("daniv");
        user.setPassword("123");
        user.setEmail("daniv@gmail.com");
        user.setRole("Buyer");

        Assert.assertEquals(1, user.getId());
        Assert.assertEquals("daniv", user.getUsername());
        Assert.assertEquals("123", user.getPassword());
        Assert.assertEquals("daniv@gmail.com", user.getEmail());
        Assert.assertEquals("Buyer", user.getRole());
    }
}
