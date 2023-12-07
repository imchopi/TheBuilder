import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  Build,
  BuildPayload,
  Class,
  Item,
} from 'src/app/core/interfaces/build';
import { BuildService } from 'src/app/core/services/build-info/build.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-build-form-add',
  templateUrl: './build-form-add.component.html',
  styleUrls: ['./build-form-add.component.scss'],
})
export class BuildFormAddComponent implements OnInit {
  @Input() builds: Build | null = null;
  @Output() onCardClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() onRegister = new EventEmitter<BuildPayload>();

  form: FormGroup;
  mode = false;
  buildname: string | null = null;
  selectedClasses: Class[] | null = null;
  selectedItems: Item[] | null = null;
  buildId: number | null = null

  @Input() set build(_build: Build | null) {
    if (_build) {
      this.form.controls['buildname'].setValue(_build.attributes.build_name);
      this.form.controls['selectedClasses'].setValue(_build.attributes.class.data.id);
      this.form.controls['selectedItems'].setValue(_build.attributes.items.data.map((item) => item.id));
      console.log("Soy _build: " + _build.attributes.class.data.attributes.name); 
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private buildService: BuildService,
    private _modal: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      buildname: ['', Validators.required],
      selectedClasses: [null, Validators.required],
      selectedItems: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.buildService.getClasses().subscribe((response) => {
      this.selectedClasses = response;
      console.log('Selected Classes:', this.selectedClasses);
    });

    this.buildService.getItems().subscribe((response) => {
      this.selectedItems = response;
      console.log('Selected Items:', this.selectedItems);
    });
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const buildIdParam = paramMap.get('buildId');
      if (buildIdParam) {
        this.mode = true
        this.buildId = Number(buildIdParam)
        const buildId = Number(buildIdParam);
        this.buildService.getBuildById(buildId).subscribe(
          (res) => {
            this.build = res
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  onRegisterBuild() {
    if (this.form && this.form.valid) {
      const buildData: BuildPayload = {
        build_name: this.form.get('buildname')?.value,
        class: this.form.get('selectedClasses')?.value,
        items: this.form.get('selectedItems')?.value,
      };

      this.onRegister.emit(buildData);
    }
  }

  updateBuild() {
    if (this.form && this.form.valid && this.buildId !== null) {
      const buildData: BuildPayload = {
        build_name: this.form.get('buildname')?.value,
        class: this.form.get('selectedClasses')?.value,
        items: this.form.get('selectedItems')?.value,
      };
  
      this.buildService.updateBuild(this.buildId, buildData).subscribe(
        (res) => {
          this.router.navigate(['/build-info']);
        },
        (err) => {
          console.error('Error al actualizar el build:', err);
        }
      );
    }
  }
  
}
