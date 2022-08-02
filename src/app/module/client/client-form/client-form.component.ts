import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbDialogRef,
  NbGlobalLogicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import { User } from 'src/app/core/interfaces/user';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Input() myObject: any;
  @Input() action: any;
  loading = false;
  logicalPositions = NbGlobalLogicalPosition;

  public clientForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    cedula: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
  });

  constructor(
    protected dialogRef: NbDialogRef<ClientFormComponent>,
    private ClientService: ClientService,
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    if (this.action) {
      this.clientForm.patchValue(this.myObject);
      if (this.action == 'detail') {
        this.clientForm.disable();
      }
    }
  }

  public async onSubmit() {
    this.loading = true;
    if (this.action === 'edit') {
      this.ClientService.editClient(this.clientForm.value)
        .then((data) => {
          this.showToast(
            'success',
            this.logicalPositions.BOTTOM_END,
            'El cliente fue editado exitosamente',
            ''
          );
          this.close();
          this.goList();
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        });
    }
    if (!this.action) {
      const responde = await this.ClientService.addClient(
        this.clientForm.value
      );
      this.showToast(
        'success',
        this.logicalPositions.BOTTOM_END,
        'El cliente fue creado exitosamente',
        ''
      );
      this.close();
      this.goList();
      this.loading = false;
    }
  }

  public close(data?: any) {
    this.dialogRef.close({ data: data });
  }

  public goList() {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/client/list']));
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
}
