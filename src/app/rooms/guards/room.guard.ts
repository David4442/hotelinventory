import { CanActivateChildFn } from '@angular/router';

export const roomGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
