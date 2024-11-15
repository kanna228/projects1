package src.decorator;

public class InsuranceAddon implements BookingDecorator {
    private BookingDecorator booking;

    public InsuranceAddon(BookingDecorator booking) {
        this.booking = booking;
    }

    @Override
    public String getDescription() {
        return booking.getDescription() + ", Insurance";
    }

    @Override
    public double getCost() {
        return booking.getCost() + 15.00;
    }
}
