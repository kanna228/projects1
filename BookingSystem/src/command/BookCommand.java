package src.command;

import src.model.Booking;

public class BookCommand implements Command {
    private Booking booking;

    public BookCommand(Booking booking) {
        this.booking = booking;
    }

    @Override
    public void execute() {
        booking.book();
    }
}
