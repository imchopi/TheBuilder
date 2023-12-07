import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../core/services/translate/custom-translate.service';
import { BuildFormAddComponent } from './components/build-form/build-form-add.component';

@NgModule({
  declarations: [
    BuildFormAddComponent,
    MenuComponent,
    LoginFormComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    BuildFormAddComponent,
    ReactiveFormsModule,
    MenuComponent,
    LoginFormComponent,
    RegisterComponent,
    CommonModule,
    IonicModule,
    FormsModule,
  ],
})
export class SharedModule {}
