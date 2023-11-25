import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _auth: AuthService, private _router: Router) {
    this._auth.isLogged$.subscribe((logged) => {
      console.log('llamadas de logged');
      if (logged) {
        console.log(logged);
        this._router.navigate(['/home']);
      } else {
        console.log(logged);
        this._router.navigate(['/login']);
      }
    });
  }
}
