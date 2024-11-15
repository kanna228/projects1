package src.controller;

import src.model.BookingModel;
import src.view.BookingView;

public class BookingController {
    private BookingModel model;
    private BookingView view;

    public BookingController(BookingModel model, BookingView view) {
        this.model = model;
        this.view = view;
    }

    public void setBookingDetails(String details) {
        model.setBookingDetails(details);
        view.displayBooking(model.getBookingDetails());
    }

    public String getBookingDetails() {
        return model.getBookingDetails();
    }
}
