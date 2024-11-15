package src.command;

import src.model.Booking;

public class CancelCommand implements Command {
    private Booking booking;

    public CancelCommand(Booking booking) {
        this.booking = booking;
    }

    @Override
    public void execute() {
        System.out.println("Booking cancelled.");
    }
}
