export interface IExchange {
    exchangeId: string;
    name: string;
    rank: string;
    percentTotalVolume: number;
    volumeUsd: number;
    tradingPairs: number;
    socket: boolean;
    exchangeUrl: string;
    updated: number;
}

export interface IExchangeAPI {
    data: IExchange[]
}
