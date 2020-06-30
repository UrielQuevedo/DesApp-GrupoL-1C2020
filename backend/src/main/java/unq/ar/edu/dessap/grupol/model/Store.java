package unq.ar.edu.dessap.grupol.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
@Table(name = "stores")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String name;

    @JoinColumn(name = "sector_name")
    @Enumerated(value = EnumType.STRING)
    private Sector sector;

    @Column
    private Location location;

    @ElementCollection(fetch = FetchType.EAGER)
    @JoinTable(name = "rel_stores_days", joinColumns =
    @JoinColumn(name = "fk_store", nullable = false))
    @Column(name = "day")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private List<DayOfWeek> openDays = new ArrayList<>();

    @JoinTable(
            name = "rel_stores_times",
            joinColumns = @JoinColumn(name = "fk_store"),
            inverseJoinColumns = @JoinColumn(name="fk_time")
    )
    @ManyToMany(cascade = CascadeType.ALL)
    @Builder.Default
    private List<Time> times = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "rel_stores_payments", joinColumns =
    @JoinColumn(name = "fk_store"))
    @Column(name = "payment")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private List<Payment> payments = new ArrayList<>();

    @Column(nullable = false)
    private Double maxDistance;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "store")
    @Builder.Default
    @JsonIgnore
    private List<Product> products = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "store")
    @Builder.Default
    private List<Turn> turns = new ArrayList<>();

    public void addProduct(Product product) {
        this.products.add(product);
    }

    public void addDay(DayOfWeek day) {
        this.openDays.add(day);
    }

    public void addPayments(Payment payment) {
        this.payments.add(payment);
    }

    public void addTimes(Time time) {
        this.times.add(time);
    }

    public boolean getIsOpen() {
        DateTimeFormatter isoTime = DateTimeFormatter.ofPattern("HH:mm");
        String today = LocalDate.now().getDayOfWeek().toString();
        boolean isOpenToday = this.getOpenDays().stream().anyMatch(dayOfWeek -> dayOfWeek.name().equals(today));

        return isOpenToday && this.times.stream().anyMatch(time -> {
            LocalTime start = LocalTime.parse(time.getOf(), isoTime);
            LocalTime end = LocalTime.parse(time.getUntil(), isoTime);
            LocalTime timeNow = LocalTime.now();
            if (start.isAfter(end)) {
                return !timeNow.isBefore(start) || !timeNow.isAfter(end);
            } else {
                return !timeNow.isBefore(start) && !timeNow.isAfter(end);
            }
        });
    }

    public List<String> getTickets() {
        DateTimeFormatter isoTime = DateTimeFormatter.ofPattern("HH:mm");
        List<String> tickets = new ArrayList<>();
        this.times.forEach(time -> tickets.addAll(GenerateTickets
                .generateTickets( LocalTime.parse(time.getOf(), isoTime),  LocalTime.parse(time.getUntil(), isoTime), 15)
        .stream().map(localTime -> localTime.format(isoTime)).collect(Collectors.toList())));
        return tickets;
    }

    public void verifyPayment(Payment payment) {
        if (!this.payments.contains(payment)) throw new RuntimeException("El Payment no es valido");
    }

    public void verifyTurn(String turnTime) {
        if (this.turns.stream().anyMatch(turn -> turn.getTime().equals(turnTime))) throw new RuntimeException("El Turno ya esta tomado");
    }

    public void addTurn(Turn turn) {
        this.turns.add(turn);
    }
}
