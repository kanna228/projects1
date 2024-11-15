package src.decorator;

public class BreakfastAddon implements BookingDecorator {
    private BookingDecorator booking;

    public BreakfastAddon(BookingDecorator booking) {
        this.booking = booking;
    }

    @Override
    public String getDescription() {
        return booking.getDescription() + ", Breakfast";
    }

    @Override
    public double getCost() {
        return booking.getCost() + 20.00;
    }
}
