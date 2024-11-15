package src.model;

public class BookingFactory {
    public static Booking createBooking(String type) {
        switch (type.toLowerCase()) {
            case "hotel": return new HotelBooking();
            case "flight": return new FlightBooking();
            case "car": return new CarRentalBooking();
            default: throw new IllegalArgumentException("Unknown booking type");
        }
    }
}
