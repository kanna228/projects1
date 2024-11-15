package src;
import src.command.*;
import src.controller.BookingController;
import src.decorator.*;
import src.facade.BookingFacade;
import src.model.*;
import src.observer.*;
import src.view.BookingView;

public class Main {
    public static void main(String[] args) {
        // Singleton example
        DatabaseConnection connection = DatabaseConnection.getInstance();
        connection.connect();

        // Factory Method example
        Booking booking = BookingFactory.createBooking("hotel");
        booking.book();

        // Facade example
        BookingFacade facade = new BookingFacade();
        facade.book("hotel", 150.0);

        // Decorator example
        BookingDecorator bookingWithBreakfast = new BreakfastAddon(new BasicBooking());
        System.out.println(bookingWithBreakfast.getDescription() + " costs " + bookingWithBreakfast.getCost());

        // Observer example
        BookingNotifier notifier = new BookingNotifier();
        User user1 = new User("Alice");
        notifier.addObserver(user1);
        notifier.notifyAvailability("hotel");

        // Command example
        BookingManager manager = new BookingManager();
        Command bookCommand = new BookCommand(booking);
        manager.executeCommand(bookCommand);

        // Initialize model, view, and controller
        BookingModel model = new BookingModel();
        BookingView view = new BookingView();
        BookingController controller = new BookingController(model, view);

        // Set booking details using the controller
        controller.setBookingDetails("Hotel booking for 2 guests, 3 nights.");
    }
}
