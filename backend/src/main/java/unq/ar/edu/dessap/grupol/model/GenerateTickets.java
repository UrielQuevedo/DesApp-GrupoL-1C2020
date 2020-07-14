package unq.ar.edu.dessap.grupol.model;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class GenerateTickets {

    private static long diferrenceHour(LocalTime start, LocalTime end) {
        if (start.isAfter(end)) {
            LocalDateTime startLDT = LocalDateTime.of(1,1,1, start.getHour(),start.getMinute());
            LocalDateTime endLDT = LocalDateTime.of(1,1,2, end.getHour(),end.getMinute());
            return Duration.between(startLDT, endLDT).getSeconds() / 60;
        }
        return Duration.between(start, end).getSeconds() / 60;
    }

    private static boolean isTicketAdded(LocalTime currentTime, LocalTime ticket, boolean isNewDay, Store store) {
        return (currentTime.isBefore(ticket) ||
                (isNewDay && currentTime.isAfter(ticket))) &&
                        !store.getTurns().stream().map(Turn::getTime).collect(Collectors.toList()).contains(ticket.toString());
    }

    public static List<LocalTime> generateTickets(LocalTime start, LocalTime end, int difference, Store store) {
        List<LocalTime> tickets = new ArrayList<>();
        LocalTime currentTime = LocalTime.now();
        LocalTime ticket = start;
        int ticketHour = ticket.getHour();
        int ticketMinute = ticket.getMinute();
        boolean isNewDay = false;
        long missingMinutes = diferrenceHour(start, end);

        while (missingMinutes >= 0) {
            if (isTicketAdded(currentTime, ticket, isNewDay, store)) {
                tickets.add(ticket);
            }
            ticketMinute += difference;
            if (ticketMinute >= 60) {
                ticketHour++;
                if (ticketHour >= 24) {
                    ticketHour = 0;
                    isNewDay = true;
                }
                ticketMinute -= 60;
            }
            ticket = LocalTime.of(ticketHour, ticketMinute);
            missingMinutes -= difference;
        }
        return tickets;
    }
}
