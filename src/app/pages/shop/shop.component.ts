import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ShopService } from './shop.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { CommonModule } from '@angular/common';
import { IMarket } from '../market/market.interface';
import { Select, Store } from '@ngxs/store';
import { SetCart } from '../../core/stores/actions/store.action';
import { StoreState } from '../../core/stores/states/configuration.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})

export class ShopComponent implements OnInit {
  quantity: number = 0;
  price: number = 0;
  asset: IMarket;
  @Select(StoreState.getAsset) asset$: Observable<IMarket>;

  constructor(
    private shopService: ShopService,
    private notificationService: NotificationsService,
    private store: Store
  ) { }

  ngOnInit(): void {
    // Subscribe to Asset Store
    this.asset$.subscribe(asset => {
      this.asset = asset;
    })

    this.getDoge();
  }

  addItem(value: boolean) {
    if (value) {
      this.quantity++;
    } else {
      if (this.quantity > 0) {
        this.quantity--;
      }
    }

    if (this.quantity > 1) {
      this.price = (this.quantity * 4) / Number(this.asset.priceUsd);
      this.price = this.price - (this.price * 0.05);
    } else {
      this.price = (this.quantity * 4) / Number(this.asset.priceUsd)
    }

    // Store Cart
    this.store.dispatch(new SetCart({
      price: this.price,
      quantity: this.quantity
    }));
  }

  getDoge(): void {

    const asset = this.store.selectSnapshot(StoreState.getAsset);
    if (Object.values(asset).length > 0) {
      this.asset = asset as IMarket;
      return;
    }

    this.shopService.get('dogecoin')
      .then(asset => {
        this.asset = asset.data;
      })
      .catch(() => {
        this.notificationService.notificationError()
      })
  }


  next(stepper: MatStepper, step: number): void {
    if (step === 1) {
      if (this.quantity > 0) {
        stepper.next();
      } else {
        this.notificationService.notificationErrorWithText('You must add at least one ticket')
      }
    } else {
      stepper.next();
    }
  }

}
