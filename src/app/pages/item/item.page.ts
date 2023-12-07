import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Build, Class, Item, Qualities, Types } from 'src/app/core/interfaces/build';
import { BuildService } from 'src/app/core/services/build-info/build.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  constructor(
    private buildService: BuildService,
    private alertController: AlertController
  ) {}

  items: Item[] = [];
  types: Types[] | null = null;
  qualities: Qualities[] | null = null;

  ngOnInit() {
    this.buildService.getItems().subscribe((response) => {
      this.items = response;
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
    this.buildService.getItems().subscribe((response) => {
      this.items = response;
      console.log(this.items);
    });
  }

  async deleteItem(id: number) {
    const alertItem = await this.alertController.create({
      header: 'Remove',
      subHeader: 'Remove this item',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.buildService.deleteItem(id).subscribe(
              (res) => {
                this.buildService.getItems().subscribe((response) => {
                  this.items = response;
                  console.log(this.items);
                });
              },
              (err) => console.log(err)
            );
          },
        },
        'Cancel',
      ],
    });
    await alertItem.present();
  }
}

