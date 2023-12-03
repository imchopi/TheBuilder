import { Component, OnInit } from '@angular/core';
import { Build, Class, Qualities, Types} from 'src/app/core/interfaces/build';
import { BuildService } from 'src/app/core/services/build-info/build.service';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.page.html',
  styleUrls: ['./build-info.page.scss'],
})
export class BuildInfoPage implements OnInit {

  builds: Build[] = [];
  classes: Class[] | null = null
  types: Types | null = null
  qualities: Qualities | null = null

  constructor(public buildService: BuildService) {}

  ngOnInit() {
    this.buildService.getAll().subscribe((response) => {
      this.builds = response
    });
    this.buildService.getClasses().subscribe((response) => {
      this.classes = response
    });
    this.buildService.getTypes().subscribe((response) => {
      this.types = response
    });
    this.buildService.getQualities().subscribe((response) => {
      this.qualities = response
    });
  }
}