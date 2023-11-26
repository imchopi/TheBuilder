import { Component, OnInit } from '@angular/core';
import { Build} from 'src/app/core/interfaces/build';
import { BuildService } from 'src/app/core/services/build-info/build.service';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.page.html',
  styleUrls: ['./build-info.page.scss'],
})
export class BuildInfoPage implements OnInit {
  builds: Build[] = [];

  constructor(public buildService: BuildService) {}

  ngOnInit() {
    this.buildService.getAll().subscribe((response) => {
      console.log(response);
      // Asigna directamente el array de Build a la propiedad builds
      this.builds = response
    });
  }
}