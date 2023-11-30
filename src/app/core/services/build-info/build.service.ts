import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Build } from '../../interfaces/build'; // Asegúrate de importar BuildInfo, no Build

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  private _builds: BehaviorSubject<Build[]> = new BehaviorSubject<Build[]>([]);
  public builds$: Observable<Build[]> = this._builds.asObservable();

  constructor(private apiSvc: ApiService) {
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

  /*addBuild() {
    return new Observable
  }*/
}
