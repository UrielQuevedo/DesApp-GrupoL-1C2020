package unq.ar.edu.dessap.grupol.model;

import org.junit.Assert;
import org.junit.Test;
import unq.ar.edu.dessap.grupol.service.builder.TurnBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.mockito.Mockito.mock;

public class TurnTest {

    @Test
    public void testGivenATurnWithIdWhenReceiveGetIdThenGiveHisId() {
        Turn turn = TurnBuilder.aTurn()
                    .withId(1).build();

        Assert.assertEquals(1, turn.getId());
    }

    @Test
    public void testGivenATurnWithStoreWhenReceiveGetStoreThenGiveHisStore() {

        Store storeMock = mock(Store.class);

        Turn turn = TurnBuilder.aTurn()
                    .withStore(storeMock).build();

        Assert.assertEquals(storeMock, turn.getStore());
    }

    @Test
    public void testGivenATurnWithUserWhenReceiveGetUserThenGiveHisUser() {

        User userMock = mock(User.class);

        Turn turn = TurnBuilder.aTurn()
                    .withUser(userMock).build();

        Assert.assertEquals(userMock, turn.getUser());
    }

    @Test
    public void testGivenATurnWithDateWhenReceiveGetLocalDateTimeThenGiveHisDate() {

        LocalDateTime date = LocalDateTime.now();

        Turn turn = TurnBuilder.aTurn()
                    .withLocalDateTime(date).build();

        Assert.assertEquals(date, turn.getDate());
    }

}
