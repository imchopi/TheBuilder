import { Injectable, Type } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Build,
  BuildPayload,
  Class,
  Item,
  Qualities,
  Types,
} from '../../interfaces/build'; // Asegúrate de importar BuildInfo, no Build
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  private _builds: BehaviorSubject<Build[]> = new BehaviorSubject<Build[]>([]);
  public builds$: Observable<Build[]> = this._builds.asObservable();

  constructor(private apiSvc: ApiService, private jwtSvc: JwtService) {
    this.init();
  }

  async init() {
    await this.getAll();
  }

  getAll(): Observable<Build[]> {
    return this.apiSvc
      .get(
        '/build-infos?populate=build,items,items.quality_id,items.type_id,class,class.class_img'
      )
      .pipe(map((response: any) => response.data));
  }

  getBuildById(buildId: number): Observable<Build> {
    return this.apiSvc
      .get(
        `/build-infos/${buildId}?populate=build,items,items.quality_id,items.type_id,class,class.class_img`
      )
      .pipe(map((response: any) => response.data));
  }

  getItems(): Observable<Item[]> {
    return this.apiSvc
      .get('/items')
      .pipe(map((response: any) => response.data));
  }

  getTypes(): Observable<Types> {
    return this.apiSvc
      .get('/types')
      .pipe(map((response: any) => response.data));
  }

  // Función para obtener la lista de qualities desde el backend
  getQualities(): Observable<Qualities> {
    return this.apiSvc
      .get('/qualities')
      .pipe(map((response: any) => response.data));
  }

  // Función para obtener la lista de classes desde el backend
  getClasses(): Observable<Class[]> {
    return this.apiSvc
      .get('/classes')
      .pipe(map((response: any) => response.data));
  }

  addBuild(build: BuildPayload): Observable<Build> {
    console.log('Entro al add build' + build);
    return new Observable<Build>((obs) => {
      const _buildPayload: BuildPayload = {
        build_name: build.build_name,
        items: build.items,
        class: build.class,
      };
      this.apiSvc.post('/build-infos', { data: _buildPayload }).subscribe({
        next: async (data: any) => {
          obs.next(data);
          obs.complete();
        },
        error: (err) => {
          obs.error(err);
        },
      });
    });
  }

  updateBuild(buildId: number, build: BuildPayload): Observable<Build> {
    return new Observable<Build>((obs) => {
      const _buildPayload: BuildPayload = {
        build_name: build.build_name,
        items: build.items,
        class: build.class,
      };
      this.apiSvc
        .put(`/build-infos/${buildId}`, { data: _buildPayload })
        .subscribe({
          next: async (data: any) => {
            obs.next(data);
            obs.complete();
          },
          error: (err) => {
            obs.error(err);
          },
        });
    });
  }

  deleteBuild(id: number) {
    return this.apiSvc.delete(`/build-infos/${id}`)
  }
}
