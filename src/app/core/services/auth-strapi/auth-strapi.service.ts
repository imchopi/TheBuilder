import { UserCredentials } from 'src/app/core/interfaces/user-credentials';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '../jwt/jwt.service';
import { Observable, lastValueFrom, map } from 'rxjs';
import {
  StrapiExtendedUser,
  StrapiLoginPayload,
  StrapiLoginResponse,
  StrapiRegisterPayload,
  StrapiRegisterResponse,
  StrapiUser,
} from 'src/app/core/interfaces/strapi';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';
import { User } from 'src/app/core/interfaces/user';

export class AuthStrapiService extends AuthService {
  constructor(private jwtSvc: JwtService, private apiSvc: ApiService) {
    super();
    this.init();
  }

  private init() {
    this.jwtSvc.loadToken().subscribe({
      next: (logged) => {
        this._logged.next(logged != '');
      },
      error: (err) => {
        console.log('No hay token');
      },
    });
  }

  public login(credentials: UserCredentials): Observable<void> {
    return new Observable<void>((obs) => {
      const _credentials: StrapiLoginPayload = {
        identifier: credentials.email,
        password: credentials.password,
      };
      this.apiSvc.post('/auth/local', _credentials).subscribe({
        next: async (data: StrapiLoginResponse) => {
          console.log('Login');

          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          let connected = data && data.jwt != '';
          this._logged.next(connected);
          obs.next();
          obs.complete();
        },
        error: (err) => {
          obs.error(err);
        },
      });
    });
  }

  logout(): Observable<void> {
    return this.jwtSvc.destroyToken().pipe(
      map((_) => {
        return;
      })
    );
  }

  register(info: UserRegisterInfo): Observable<void> {
    console.log('Register');
    return new Observable<void>((obs) => {
      const _info: StrapiRegisterPayload = {
        email: info.email,
        username: info.username,
        password: info.password,
      };
      this.apiSvc.post('/auth/local/register', _info).subscribe({
        next: async (data: StrapiRegisterResponse) => {
          let connected = data && data.jwt != '';
          this._logged.next(connected);
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          const _extended_user: StrapiExtendedUser = {
            data: {
              users: data.user.id,
              name: info.name,
              surname: info.surname,
            },
          };
          await lastValueFrom(
            this.apiSvc.post('/extender-users', _extended_user)
          );
          obs.next();
          obs.complete();
        },
        error: (err) => {
          obs.error(err);
        },
      });
    });
  }

  public me(): Observable<User> {
    console.log('Me');
    return new Observable<User>((obs) => {
      this.apiSvc.get('/users/me').subscribe({
        next: async (user: StrapiUser) => {
          let extended_user = await lastValueFrom(
            this.apiSvc.get(`/extender-users?filters[user_id]=${user.id}`)
          );
          let ret: User = {
            id: user.id,
            name: extended_user.name,
            surname: extended_user.surname,
            age: 0,
          };
          obs.next(ret);
          obs.complete();
        },
        error: (err) => {
          obs.error(err);
        },
      });
    });
  }
}
