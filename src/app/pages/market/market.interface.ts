export interface IMarket {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: number;
    maxSupply: number;
    marketCapUsd: number;
    volumeUsd24Hr: number;
    priceUsd: number;
    changePercent24Hr: number;
    vwap24Hr: number;
    explorer: string;
}

export interface IMarketAPI {
    data: IMarket[]
}
