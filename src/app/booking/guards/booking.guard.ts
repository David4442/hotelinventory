import { CanDeactivateFn } from '@angular/router';
import { BookingComponent } from '../booking.component';

export const bookingGuard: CanDeactivateFn<BookingComponent> = (
  component: BookingComponent,
  currentRoute,
  currentState,
  nextState
) => {
  return component.bookingForm.pristine;
};
