package src.facade;

import src.model.AvailabilityService;
import src.model.NotificationService;
import src.model.PaymentService;

public class BookingFacade {
    private AvailabilityService availabilityService = new AvailabilityService();
    private PaymentService paymentService = new PaymentService();
    private NotificationService notificationService = new NotificationService();

    public void book(String bookingType, double amount) {
        if (availabilityService.checkAvailability(bookingType)) {
            paymentService.processPayment(amount);
            notificationService.sendConfirmation(bookingType);
        }
    }
}
