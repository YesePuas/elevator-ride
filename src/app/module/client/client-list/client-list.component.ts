import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbComponentStatus,
  NbDialogService,
  NbGlobalLogicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';
import { User } from 'src/app/core/interfaces/user';
import { ClientFormComponent } from '../client-form/client-form.component';
import { ClientService } from '../client.service';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  defaultColumns = ['nombre', 'cedula', 'telefono', 'direccion'];
  customColumn = 'action';
  allColumns = [this.customColumn, ...this.defaultColumns];
  data: TreeNode<User>[] = [];
  loading = false;
  valueToDelete: any;
  logicalPositions = NbGlobalLogicalPosition;

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private ClientService: ClientService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  public getClientes() {
    this.loading = true;
    this.data = [];
    let array: TreeNode<User>[] = [];
    this.ClientService.getClient().subscribe((result) => {
      result.forEach((value) => {
        let obj = {
          data: value,
        };
        array.push(obj);
      });
      this.data = array;
      this.loading = false;
    });
  }

  public addClient() {
    this.openDialog();
  }

  public goToDetail(data: any) {
    this.openDialog(data, 'detail');
  }

  public goToEdit(data: any) {
    this.openDialog(data, 'edit');
  }

  public openDialog(object?: User, action?: string) {
    this.dialogService.open(ClientFormComponent, {
      context: {
        myObject: object,
        action: action,
      },
    });
  }

  public goToDelete(dialog: TemplateRef<any>, data: User) {
    this.valueToDelete = data;
    this.dialogService.open(dialog, {
      context: '¿Estás seguro que deseas eliminar un cliente?',
    });
  }

  public async confirm(approve: any, ref: any) {
    this.loading = true;
    if (approve) {
      const response = await this.ClientService.delectClient(
        this.valueToDelete
      );
      ref.close();
      if (response == undefined) {
        this.valueToDelete = {};
        this.getClientes();
        this.showToast(
          'success',
          this.logicalPositions.BOTTOM_END,
          'El cliente fue eliminado exitosamente',
          ''
        );
      }
      this.loading = false;
    } else {
      this.loading = false;
    }
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
