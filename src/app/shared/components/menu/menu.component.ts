import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() username: string = 'Adrián P. Fernández';
  @Input() nickname: string = 'Chopito';
  @Input() languages: string[] = ['es', 'en'];
  @Input() languageSelected: string = 'es';

  currentPage: string = 'login';

  constructor(
    private _menu: MenuController,
    private _router: Router,
    private _auth: AuthService,
    private _lang: TranslateService
  ) {}
  ngOnInit(): void {
    this._auth.isLogged$.subscribe((logged) => {
      if (logged) {
        this.currentPage = 'home';
        this._router.navigate(['/home']);
        this._menu.close();
      }
    });
    this._lang.use('es')
  }

  about() {
    this.currentPage = 'about';
    this._router.navigate(['about']);
    this._menu.close();
  }

  home() {
    this.currentPage = 'home';
    this._router.navigate(['home']);
    this._menu.close();
  }

  build() {
    this.currentPage = 'build-info';
    this._router.navigate(['build-info']);
    this._menu.close();
  }

  item() {
    this.currentPage = 'item';
    this._router.navigate(['item']);
    this._menu.close();
  }

  login() {
    this.currentPage = 'login';
    this._router.navigate(['/login']);
    this._menu.close();
  }

  signUp() {
    this.currentPage = 'signup';
    this._router.navigate(['signup']);
    this._menu.close();
  }

  logout() {
    this._auth.logout();
    this.currentPage = 'login';
    this._router.navigate(['login']);
    this._menu.close();
  }

  setLanguage(lang: string) {
    this.languageSelected = lang;
    this._lang.use(lang)
  }
}
