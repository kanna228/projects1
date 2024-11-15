package src.decorator;

public class BasicBooking implements BookingDecorator {
    @Override
    public String getDescription() {
        return "Basic booking";
    }

    @Override
    public double getCost() {
        return 100.00;
    }
}
