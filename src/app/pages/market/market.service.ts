import { Injectable } from '@angular/core';
import { IMarketAPI } from './market.interface';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  baseUrl: string = "https://api.coincap.io/v2/"

  constructor(
    private http: HttpClient
  ) { }

  get(): Promise<IMarketAPI> {
    return lastValueFrom(this.http.get(this.baseUrl + 'assets')) as Promise<IMarketAPI>;
  }
}
