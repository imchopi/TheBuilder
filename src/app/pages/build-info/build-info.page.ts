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
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.page.html',
  styleUrls: ['./build-info.page.scss'],
})
export class BuildInfoPage implements OnInit {
  constructor(
    private buildService: BuildService,
    private alertController: AlertController,
    private auth: AuthService
  ) {}

  user: User | null = null
  builds: Build[] = [];
  classes: Class[] | null = null;
  types: Types[] | null = null;
  qualities: Qualities[] | null = null;

  ngOnInit() {
    this.auth.me().subscribe({
      next: (_) => {
        this.user = _
        this.buildService.getAllBuildByUser(this?.user?.id).subscribe((response) => {
          this.builds = response
        })
      }
    })
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
    this.auth.me().subscribe({
      next: (_) => {
        this.user = _
        this.buildService.getAllBuildByUser(this?.user?.id).subscribe((response) => {
          this.builds = response
        })
      }
    })
  }

  async deleteBuild(id: number) {
    const alertBuild = await this.alertController.create({
      header: 'Remove',
      subHeader: 'Remove this build',
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
