package src.observer;

import java.util.ArrayList;
import java.util.List;

public class BookingNotifier {
    private List<Observer> observers = new ArrayList<>();

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }

    public void notifyAvailability(String bookingType) {
        notifyObservers("Availability updated for " + bookingType);
    }
}
