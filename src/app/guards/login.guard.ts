import { CanActivateFn } from '@angular/router';
import { LoginService } from '../login/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  
  return true;
};
