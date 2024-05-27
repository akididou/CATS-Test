import { Component, OnInit, ViewChild } from '@angular/core';
import { MarketService } from './market.service';
import { IMarket } from './market.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyCustomPipe } from '../../core/pipes/currency-custom.pipe';
import { NotificationsService } from '../../core/services/notifications.service';
import { Store } from '@ngxs/store';
import { SetAsset } from '../../core/stores/actions/store.action';

@Component({
  selector: 'app-market',
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
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'name', 'priceUsd', 'marketCapUsd', 'vwap24Hr', 'supply', 'volumeUsd24Hr', 'changePercent24Hr'];
  dataSource: any;
  doge: IMarket[];
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private marketService: MarketService,
    private notificationService: NotificationsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getMarketCoin();
  }

  async getMarketCoin(): Promise<void> {
    this.marketService.get()
      .then(market => {
        this.doge = market.data.filter(d => d.id === 'dogecoin')
        this.store.dispatch(new SetAsset(this.doge[0]))
        this.dataSource = new MatTableDataSource(market.data);
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
