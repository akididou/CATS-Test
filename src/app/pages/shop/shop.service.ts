import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IAssetAPI } from './shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = "https://api.coincap.io/v2/"

  constructor(
    private http: HttpClient
  ) { }

  get(id: string): Promise<IAssetAPI> {
    return lastValueFrom(this.http.get(this.baseUrl + 'assets/' + id)) as Promise<IAssetAPI>;
  }
}
