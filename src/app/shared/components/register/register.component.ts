import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() register = new EventEmitter<UserRegisterInfo>();

  form: FormGroup | null = null;

  @Input('username')
  set username(value: string) {
    this.form?.controls['username'].setValue(value);
  }

  @Input('name')
  set name(value: string) {
    this.form?.controls['name'].setValue(value);
  }

  @Input('surname')
  set surname(value: string) {
    this.form?.controls['surname'].setValue(value);
  }

  @Input('email')
  set email(value: string) {
    this.form?.controls['email'].setValue(value);
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  onRegister() {
    this.register.emit(this.form?.value);
    console.log(this.form?.value);
    this.form?.reset();
  }
}
