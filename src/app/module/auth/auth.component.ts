import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import { Patterns } from 'src/app/core/resources/patterns';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  showPassword = false;
  public loginForm = new FormGroup({});
  logicalPositions = NbGlobalLogicalPosition;

  constructor(
    private formBuilder: FormBuilder,
    private patterns: Patterns,
    private router: Router,
    private toastrService: NbToastrService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.pattern(this.patterns.EMAIL), Validators.required],
      ],
      password: ['', Validators.required],
    });
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

  public onSubmit() {
    this.showToast('danger', this.logicalPositions.BOTTOM_END);
    this.router.navigate(['/client']);
  }

  showToast(status: NbComponentStatus, position: NbGlobalPosition) {
    this.toastrService.show('This is super toast message', 'Datos Invalido', {
      status,
      position,
    });
  }

  public register() {
    this.router.navigate(['/signIn']);
  }
}
