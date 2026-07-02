import React from 'react';
import { CapitalGains } from '../types';
import { formatCurrency } from '../utils/formatters';

interface AfterHarvestingCardProps {
  gains: CapitalGains;
  preHarvestingTotal: number;
}

const AfterHarvestingCard: React.FC<AfterHarvestingCardProps> = ({ gains, preHarvestingTotal }) => {
  const netStcg = gains.stcg.profits - gains.stcg.losses;
  const netLtcg = gains.ltcg.profits - gains.ltcg.losses;
  const totalNetGains = netStcg + netLtcg;

  const savings = preHarvestingTotal - totalNetGains;
  const showSavings = savings > 0;

  return (
    <div className="bg-primary rounded-2xl p-6 flex flex-col h-full text-white shadow-lg relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-6">After Harvesting</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-medium opacity-90">
          <div></div>
          <div className="text-right">Short-term</div>
          <div className="text-right">Long-term</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="opacity-90">Profits</div>
          <div className="text-right">{formatCurrency(gains.stcg.profits)}</div>
          <div className="text-right">{formatCurrency(gains.ltcg.profits)}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="opacity-90">Losses</div>
          <div className="text-right">{formatCurrency(gains.stcg.losses)}</div>
          <div className="text-right">{formatCurrency(gains.ltcg.losses)}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div className="opacity-90">Net Capital Gains</div>
          <div className="text-right">{formatCurrency(netStcg)}</div>
          <div className="text-right">{formatCurrency(netLtcg)}</div>
        </div>
        
        <div className="mt-auto pt-6 border-t border-blue-400/30 flex justify-between items-center mb-4">
          <div className="font-bold text-lg">Effective Capital Gains:</div>
          <div className="font-bold text-xl">{formatCurrency(totalNetGains)}</div>
        </div>

        {showSavings && (
          <div className="bg-white/10 rounded-lg p-3 text-sm flex items-center font-medium border border-white/20">
            <span className="mr-2">🎉</span> Your taxable capital gains are reduced by: {formatCurrency(savings)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AfterHarvestingCard;
