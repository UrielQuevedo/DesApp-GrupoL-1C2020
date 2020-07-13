package unq.ar.edu.dessap.test.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.model.Location;
import unq.ar.edu.dessap.grupol.model.OrderHistory;
import unq.ar.edu.dessap.grupol.model.Store;
import unq.ar.edu.dessap.grupol.model.User;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.mock;

public class UserTest {

    @Test
    public void testGivenAUserWithUserNameAndOtherUserWithUsernameWhenTheyRecieveGetUsernameThenTheyGiveTheirUsernames() {
        User user1 = User.builder()
                .username("user1").build();

        User user2 = User.builder()
                .username("user2").build();

        Assert.assertEquals("user1", user1.getUsername());
        Assert.assertEquals("user2", user2.getUsername());
    }

    @Test
    public void testGivenAUserWithPasswordAndOtherUserWithPasswordWhenTheyRecieveGetPasswordThenTheyGiveTheirPasswords() {
        User user1 = User.builder()
                .password("password_hashed_1").build();

        User user2 = User.builder()
                .password("password_hashed_2").build();

        Assert.assertEquals("password_hashed_1", user1.getPassword());
        Assert.assertEquals("password_hashed_2", user2.getPassword());
    }

    @Test
    public void testGivenAUserWithIdAndOtherUserWithIdWhenTheyRecieveGetIdThenTheyGiveTheirIds() {
        User user1 = User.builder()
                .id(1).build();

        User user2 = User.builder()
                .id(2).build();

        Assert.assertEquals(1, user1.getId());
        Assert.assertEquals(2, user2.getId());
    }

    @Test
    public void testGivenAUserWithEmailAndOtherUserWithEmailWhenTheyRecieveGetEmailThenTheyGiveTheirEmails() {
        User user1 = User.builder()
                .email("user1@compras.en.casa").build();

        User user2 = User.builder()
                .email("user2@compras.en.casa").build();

        Assert.assertEquals("user1@compras.en.casa", user1.getEmail());
        Assert.assertEquals("user2@compras.en.casa", user2.getEmail());
    }

    @Test
    public void testGivenAUserWithLocationAndOtherUserWithLocationWhenTheyRecieveGetLocationThenTheyGiveTheirLocations() {
        Location location = mock(Location.class);

        User user1 = User.builder()
                .location(location).build();

        User user2 = User.builder()
                .location(location).build();

        Assert.assertEquals(location, user1.getLocation());
        Assert.assertEquals(location, user2.getLocation());
    }

    @Test
    public void testSetterUser() {

        List<OrderHistory> orders = new ArrayList<>();
        orders.add(mock(OrderHistory.class));

        Location location = mock(Location.class);

        User user1 = User.builder().build();
        user1.setEmail("user1@compras.en.casa");
        user1.setUsername("user1");
        user1.setId(1);
        user1.setPassword("hashed");
        user1.setOrders(orders);
        user1.setLocation(location);

        Assert.assertEquals(1, user1.getId());
        Assert.assertEquals("user1", user1.getUsername());
        Assert.assertEquals("hashed", user1.getPassword());
        Assert.assertEquals("user1@compras.en.casa", user1.getEmail());
        Assert.assertEquals(orders, user1.getOrders());
        Assert.assertEquals(location, user1.getLocation());
    }

    @Test
    public void testGivenAUserWithOrdersWhenReceiveSizeGetOrdersThenGiveTheSizeFromOrders() {

        List<OrderHistory> orders = new ArrayList<>();
        orders.add(mock(OrderHistory.class));

        User user = User.builder().
                orders(orders).build();

        Assert.assertEquals(1, user.getOrders().size());
    }

    @Test
    public void testGivenASellerWhenReceiveSizeGetStoreThenGiveIsEqualToNull() {

        User user1 = User.builder().build();

        Assert.assertNull(user1.getStore());
    }

    @Test
    public void testGivenASellerWithToStoreWhenReceiveGetStoreThenGiveHisStore() {

        Store storeMock = mock(Store.class);

        User user1 = User.builder()
                .store(storeMock).build();

        Assert.assertEquals(storeMock, user1.getStore());
    }
}
