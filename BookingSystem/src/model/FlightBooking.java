package src.model;

public class FlightBooking extends Booking {
    @Override
    public void book() {
        System.out.println("Flight booking completed.");
    }
}
