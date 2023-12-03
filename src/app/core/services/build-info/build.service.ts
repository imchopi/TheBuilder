import { Injectable, Type } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Build, Class, Item, Qualities, Types } from '../../interfaces/build'; // Asegúrate de importar BuildInfo, no Build
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

  addBuild(build: Build): Observable<Build> {
    return new Observable<Build>((obs) => {
      const itemsData = build.attributes.items.data.map((item) => {
        return {
          id: item.id,
          attributes: {
            item_name: item.attributes.item_name,
            item_detail: item.attributes.item_detail,
            type_id: item.attributes.type_id.data.id,
            quality_id: item.attributes.quality_id.data.id,
          },
        };
      });
  
      const classData = {
        id: build.attributes.class.data.id,
        attributes: {
          name: build.attributes.class.data.attributes.name,
          class_img_url: build.attributes.class.data.attributes.class_img.data.attributes.url,
        },
      };
  
      const _buildPayload = {
        build_name: build.attributes.build_name,
        items: itemsData,
        class: classData,
      };
  
      this.apiSvc.post('/build', { data: _buildPayload }).subscribe({
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
}
