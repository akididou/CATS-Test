import { Injectable } from '@angular/core';
import { IExchangeAPI } from './exchanges.interface';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  baseUrl: string = "https://api.coincap.io/v2/"

  constructor(
    private http: HttpClient
  ) { }

  get(): Promise<IExchangeAPI> {
    return lastValueFrom(this.http.get(this.baseUrl + 'exchanges')) as Promise<IExchangeAPI>;
  }
}
