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
import { BuildInfoComponent } from './components/build-info/build.component';

@NgModule({
  declarations: [
    BuildInfoComponent,
    MenuComponent,
    LoginFormComponent,
    RegisterComponent
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
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
  ],
  exports: [
    BuildInfoComponent,
    MenuComponent,
    LoginFormComponent,
    RegisterComponent,
    CommonModule,
    IonicModule,
    FormsModule,
  ],
})
export class SharedModule {}
