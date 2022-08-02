import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import { User } from 'src/app/core/interfaces/user';
import { Patterns } from 'src/app/core/resources/patterns';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loading = false;
  logicalPositions = NbGlobalLogicalPosition;
  showPassword = false;

  public userForm = new FormGroup({
    rol: new FormControl('Admin'),
    email: new FormControl('', [
      Validators.pattern(this.patterns.EMAIL),
      Validators.required,
    ]),
    password: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private patterns: Patterns,
    private signInService: SignInService
  ) {}

  ngOnInit(): void {}

  public async onSubmit() {
    this.loading = true;
    const responde = await this.signInService.SignIn(this.userForm.value);
    this.showToast(
      'success',
      this.logicalPositions.BOTTOM_END,
      'El usuario fue creado exitosamente',
      ''
    );
    this.loading = false;
  }

  public getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  public toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  showToast(
    status: NbComponentStatus,
    position: NbGlobalPosition,
    message: string,
    title: string
  ) {
    this.toastrService.show(message, title, {
      status,
      position,
    });
  }
  /* public goHome() {
    this.router.navigate(['/home']);
  } */
}
