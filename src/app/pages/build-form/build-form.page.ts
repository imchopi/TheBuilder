import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Build, Class, Item } from 'src/app/core/interfaces/build';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';
import { ApiService } from 'src/app/core/services/api/api.service';
import { BuildService } from 'src/app/core/services/build-info/build.service';

@Component({
  selector: 'app-build-form',
  templateUrl: './build-form.page.html',
  styleUrls: ['./build-form.page.scss'],
})
export class BuildFormPage implements OnInit {

  constructor(private buildService: BuildService, private router: Router){

  }

  ngOnInit(){
    
  }

  onRegister(build: Build) {
    this.buildService.addBuild(build).subscribe({
      next: (data) => {
        this.router.navigate(['/build-info']);
      },
      error: (err) => {
        console.log("Hola que tal" + err);
      },
    });
  }

  navigateBuild() {
    this.router.navigate(['/build-info']);
  }
}
