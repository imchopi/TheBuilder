import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isLogged$.pipe(
      tap((logged) => {
        console.log('Me fui' + logged);
        if (!logged) this.router.navigate(['/login']);
      })
    );
  }
}
