import { Routes } from '@angular/router';
import { MarketComponent } from './pages/market/market.component';
import { ExchangesComponent } from './pages/exchanges/exchanges.component';

export const routes: Routes = [
    {
        path: '',
        component: MarketComponent,
    },
    {
        path: 'market',
        component: MarketComponent,
    },
    {
        path: 'exchanges',
        component: ExchangesComponent,
    },
];
