import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ShopService } from './shop.service';
import { IAsset } from './shop.interface';
import { NotificationsService } from '../../core/services/notifications.service';
import { CommonModule } from '@angular/common';

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
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  quantity: number = 0;
  price: number = 0;
  asset: IAsset;

  constructor(
    private _formBuilder: FormBuilder,
    private shopService: ShopService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
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
  }

  getDoge(): void {
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
