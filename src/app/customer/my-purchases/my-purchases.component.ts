import { CurrencyPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MyPurchasesTableDataModel } from './my-purchases.model';
import { MyPurchasesService } from './my-purchases.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Sale } from '../../shared/models/event.model';
import { VoucherDialogComponent } from '../../shared/components/voucher-dialog/voucher-dialog.component';

@Component({
  selector: 'app-my-purchases',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyPipe,
  ],
  templateUrl: './my-purchases.component.html',
  styleUrl: './my-purchases.component.css',
})
export class MyPurchasesComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<MyPurchasesTableDataModel>();
  displayedColumns = [
    'transactionNumber',
    'event',
    'tickets',
    'payment',
    'purchaseDate',
    'eventDate',
    'ticketId',
  ];
  initialData: MyPurchasesTableDataModel[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  myPurchasesService = inject(MyPurchasesService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadPurchases();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupPaginatorLabels();
  }

  setupPaginatorLabels() {
    this.paginator._intl.itemsPerPageLabel = 'Nro de compras por página:';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente';
  }

  loadPurchases() {
    this.myPurchasesService
      .getMyPurchases(this.authService.getEmail())
      .subscribe((response) => {
        this.initialData = response.data.map(this.formatPurchaseData);
        this.dataSource.data = this.initialData;
      });
  }

  formatPurchaseData(sale: Sale): MyPurchasesTableDataModel {
    return {
      transactionNumber: sale.operationNumber,
      event: sale.title,
      tickets: sale.quantity,
      payment: sale.total,
      purchaseDate: sale.saleDate,
      eventDate: sale.dateEvent,
      ticketId: sale.saleId.toString(),
    };
  }

  onInputChange(searchValue: string) {
    this.dataSource.filter = searchValue
      ? searchValue.trim().toLocaleLowerCase()
      : '';
  }

  openVoucher(saleId: string) {
    this.matDialog.open(VoucherDialogComponent, {
      data: { saleId },
    });
  }
}