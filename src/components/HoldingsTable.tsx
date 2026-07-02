import React, { useState, useMemo } from 'react';
import { Holding } from '../types';
import { formatCurrency, formatCrypto } from '../utils/formatters';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedCoins: string[];
  onToggleSelection: (coin: string) => void;
  onToggleAll: (coinsToToggle: string[]) => void;
}

type SortField = 'stcg' | 'ltcg' | null;
type SortDirection = 'asc' | 'desc';

const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  selectedCoins,
  onToggleSelection,
  onToggleAll
}) => {
  const [showAll, setShowAll] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const processedHoldings = useMemo(() => {
    let result = [...holdings];
    
    // Sort logic
    if (sortField) {
      result.sort((a, b) => {
        const valueA = a[sortField].gain;
        const valueB = b[sortField].gain;
        
        if (sortDirection === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      });
    }

    return result;
  }, [holdings, sortField, sortDirection]);

  const displayedHoldings = showAll ? processedHoldings : processedHoldings.slice(0, 4);
  const allDisplayedSelected = displayedHoldings.length > 0 && 
    displayedHoldings.every(h => selectedCoins.includes(h.coin));

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <div className="w-4 h-4 inline-block ml-1 opacity-20"><ChevronDown size={16} /></div>;
    return sortDirection === 'desc' 
      ? <ChevronDown size={16} className="inline-block ml-1 text-primary" />
      : <ChevronUp size={16} className="inline-block ml-1 text-primary" />;
  };

  return (
    <div className="bg-card rounded-2xl border border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Holdings</h2>
        {holdings.length > 4 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-primary hover:text-blue-400 transition-colors"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#1e2233] text-gray-400">
            <tr>
              <th className="p-4 w-12 text-center">
                <input
                  type="checkbox"
                  ref={input => {
                    if (input) {
                      const someSelected = displayedHoldings.some(h => selectedCoins.includes(h.coin));
                      input.indeterminate = someSelected && !allDisplayedSelected;
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-gray-900 cursor-pointer"
                  checked={allDisplayedSelected}
                  onChange={() => onToggleAll(displayedHoldings.map(h => h.coin))}
                />
              </th>
              <th className="p-4 font-medium">Asset</th>
              <th className="p-4 font-medium text-right">
                Holdings
                <span className="block text-xs font-normal opacity-70">Avg Buy Price</span>
              </th>
              <th className="p-4 font-medium text-right">Current Price</th>
              <th 
                className="p-4 font-medium text-right cursor-pointer hover:text-gray-200 select-none group"
                onClick={() => handleSort('stcg')}
              >
                Short-Term <SortIcon field="stcg" />
              </th>
              <th 
                className="p-4 font-medium text-right cursor-pointer hover:text-gray-200 select-none group"
                onClick={() => handleSort('ltcg')}
              >
                Long-Term <SortIcon field="ltcg" />
              </th>
              <th className="p-4 font-medium text-right">Amount to Sell</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {displayedHoldings.map((holding) => {
              const isSelected = selectedCoins.includes(holding.coin);
              const stcgClass = holding.stcg.gain > 0 ? 'text-success' : holding.stcg.gain < 0 ? 'text-danger' : 'text-gray-400';
              const ltcgClass = holding.ltcg.gain > 0 ? 'text-success' : holding.ltcg.gain < 0 ? 'text-danger' : 'text-gray-400';

              return (
                <tr 
                  key={holding.coin} 
                  className={`transition-colors ${isSelected ? 'bg-[#1e3a8a]/30 hover:bg-[#1e3a8a]/40' : 'hover:bg-[#1a1e2d]'}`}
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-600 bg-transparent text-primary focus:ring-primary focus:ring-offset-gray-900 cursor-pointer"
                      checked={isSelected}
                      onChange={() => onToggleSelection(holding.coin)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={holding.logo} alt={holding.coin} className="w-8 h-8 rounded-full bg-gray-800" />
                      <div>
                        <div className="font-medium text-white">{holding.coinName}</div>
                        <div className="text-xs text-gray-500">{holding.coin}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="text-white">{formatCrypto(holding.totalHolding, holding.coin)}</div>
                    <div className="text-xs text-gray-500">{formatCurrency(holding.averageBuyPrice)}/{holding.coin}</div>
                  </td>
                  <td className="p-4 text-right text-white">
                    {formatCurrency(holding.currentPrice)}
                  </td>
                  <td className="p-4 text-right">
                    <div className={stcgClass}>
                      {holding.stcg.gain > 0 ? '+' : ''}{formatCurrency(holding.stcg.gain)}
                    </div>
                    <div className="text-xs text-gray-500">{formatCrypto(holding.stcg.balance, holding.coin)}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className={ltcgClass}>
                      {holding.ltcg.gain > 0 ? '+' : ''}{formatCurrency(holding.ltcg.gain)}
                    </div>
                    <div className="text-xs text-gray-500">{formatCrypto(holding.ltcg.balance, holding.coin)}</div>
                  </td>
                  <td className="p-4 text-right font-medium">
                    {isSelected ? formatCrypto(holding.totalHolding, holding.coin) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {!showAll && holdings.length > 4 && (
        <div className="p-4 border-t border-gray-800 text-center">
          <button 
            onClick={() => setShowAll(true)}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            View all {holdings.length} assets
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
