import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Build, Class, Item } from 'src/app/core/interfaces/build';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';
import { BuildService } from 'src/app/core/services/build-info/build.service';

@Component({
  selector: 'app-build-form-add',
  templateUrl: './build-form-add.component.html',
  styleUrls: ['./build-form-add.component.scss'],
})
export class BuildFormAddComponent  implements OnInit {
  @Output() onRegister = new EventEmitter<Build>();

  form: FormGroup | null = null;
  buildname: Build | null = null;
  selectedClasses: Class[] | null = null;
  selectedItems: Item[] | null = null;

  constructor(private formBuilder: FormBuilder, private build: BuildService, private buildService: BuildService) {
    this.form = this.formBuilder.group({
      buildname: ['', Validators.required],
      selectedClasses: ['', Validators.required],
      selectedItems: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.buildService.getClasses().subscribe((response) => {
      this.selectedClasses = response
    });
    this.buildService.getItems().subscribe((response) => {
      this.selectedItems = response
    });
  }


  onRegisterBuild() {
    this.onRegister.emit(this.form?.value);
    console.log(this.form?.value);
    this.form?.reset();
  }
}
