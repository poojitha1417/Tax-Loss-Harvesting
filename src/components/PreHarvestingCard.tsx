import React from 'react';
import { CapitalGains } from '../types';
import { formatCurrency } from '../utils/formatters';

interface PreHarvestingCardProps {
  gains: CapitalGains;
}

const PreHarvestingCard: React.FC<PreHarvestingCardProps> = ({ gains }) => {
  const netStcg = gains.stcg.profits - gains.stcg.losses;
  const netLtcg = gains.ltcg.profits - gains.ltcg.losses;
  const totalNetGains = netStcg + netLtcg;

  return (
    <div className="bg-card rounded-2xl p-6 flex flex-col h-full border border-gray-800">
      <h2 className="text-xl font-bold mb-6 text-white">Pre Harvesting</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-400">
        <div></div>
        <div className="text-right">Short-term</div>
        <div className="text-right">Long-term</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="text-gray-300">Profits</div>
        <div className="text-right">{formatCurrency(gains.stcg.profits)}</div>
        <div className="text-right">{formatCurrency(gains.ltcg.profits)}</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="text-gray-300">Losses</div>
        <div className="text-right">{formatCurrency(gains.stcg.losses)}</div>
        <div className="text-right">{formatCurrency(gains.ltcg.losses)}</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
        <div className="text-gray-300">Net Capital Gains</div>
        <div className="text-right">{formatCurrency(netStcg)}</div>
        <div className="text-right">{formatCurrency(netLtcg)}</div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-800 flex justify-between items-center">
        <div className="font-bold text-lg text-white">Realised Capital Gains:</div>
        <div className="font-bold text-xl text-white">{formatCurrency(totalNetGains)}</div>
      </div>
    </div>
  );
};

export default PreHarvestingCard;
