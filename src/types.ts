export interface GainDetails {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainDetails;
  ltcg: GainDetails;
}

export interface CapitalGainsSection {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: CapitalGainsSection;
  ltcg: CapitalGainsSection;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}
