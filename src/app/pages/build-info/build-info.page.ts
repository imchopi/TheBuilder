import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  Build,
  BuildPayload,
  Class,
  Qualities,
  Types,
} from 'src/app/core/interfaces/build';
import { BuildService } from 'src/app/core/services/build-info/build.service';
import { BuildFormAddComponent } from 'src/app/shared/components/build-form/build-form-add.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.page.html',
  styleUrls: ['./build-info.page.scss'],
})
export class BuildInfoPage implements OnInit {
  constructor(
    private modal: ModalController,
    private buildService: BuildService,
    private alertController: AlertController
  ) {}

  builds: Build[] = [];
  classes: Class[] | null = null;
  types: Types | null = null;
  qualities: Qualities | null = null;

  ngOnInit() {
    this.buildService.getAll().subscribe((response) => {
      this.builds = response;
    });
    this.buildService.getClasses().subscribe((response) => {
      this.classes = response;
    });
    this.buildService.getTypes().subscribe((response) => {
      this.types = response;
    });
    this.buildService.getQualities().subscribe((response) => {
      this.qualities = response;
    });
  }

  ionViewWillEnter() {
    console.log('Entrando');
    this.buildService.getAll().subscribe((response) => {
      this.builds = response;
      console.log(this.builds);
    });
  }

  updateBuild(id: number) {
    console.log(id);
  }

  async deleteBuild(id: number) {
    const alertBuild = await this.alertController.create({
      header: 'Remove',
      subHeader: 'Remove this post',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.buildService.deleteBuild(id).subscribe(
              (res) => {
                this.buildService.getAll().subscribe((response) => {
                  this.builds = response;
                  console.log(this.builds);
                });
              },
              (err) => console.log(err)
            );
          },
        },
        'Cancel',
      ],
    });
    await alertBuild.present();
  }
}
