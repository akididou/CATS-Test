import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangesService } from './exchanges.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyCustomPipe } from '../../core/pipes/currency-custom.pipe';
import { IExchange } from './exchanges.interface';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
  selector: 'app-exchanges',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    CurrencyCustomPipe
  ],
  templateUrl: './exchanges.component.html',
  styleUrl: './exchanges.component.scss'
})
export class ExchangesComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'name', 'tradingPairs', 'volumeUsd', 'percentTotalVolume', 'socket'];
  dataSource: any;
  bestExchange: IExchange[];
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private exchangesService: ExchangesService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.getMarketCoin();
  }

  async getMarketCoin(): Promise<void> {
    this.exchangesService.get()
      .then(exchanges => {
        this.bestExchange = exchanges.data.filter(d => d.rank === '1')
        console.log('this.bestExchange', this.bestExchange)
        this.dataSource = new MatTableDataSource(exchanges.data);
        this.dataSource.sort = this.sort;
      })
      .catch(() => {
        this.notificationService.notificationError()
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
