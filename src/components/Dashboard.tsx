import React, { useState, useMemo } from 'react';
import { Holding, CapitalGains } from '../types';
import PreHarvestingCard from './PreHarvestingCard';
import AfterHarvestingCard from './AfterHarvestingCard';
import HoldingsTable from './HoldingsTable';
import Tooltip from './Tooltip';
import { Info } from 'lucide-react';

interface DashboardProps {
  holdings: Holding[];
  initialCapitalGains: CapitalGains;
}

const Dashboard: React.FC<DashboardProps> = ({ holdings, initialCapitalGains }) => {
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);

  // Calculate pre-harvesting totals
  const preHarvestingTotal = useMemo(() => {
    const netStcg = initialCapitalGains.stcg.profits - initialCapitalGains.stcg.losses;
    const netLtcg = initialCapitalGains.ltcg.profits - initialCapitalGains.ltcg.losses;
    return netStcg + netLtcg;
  }, [initialCapitalGains]);

  // Calculate updated gains based on selected holdings
  const updatedGains = useMemo(() => {
    // Start with a deep copy of initial gains
    const newGains: CapitalGains = JSON.parse(JSON.stringify(initialCapitalGains));

    selectedCoins.forEach(coinSymbol => {
      const holding = holdings.find(h => h.coin === coinSymbol);
      if (holding) {
        // Process short term gains
        if (holding.stcg.gain > 0) {
          newGains.stcg.profits += holding.stcg.gain;
        } else if (holding.stcg.gain < 0) {
          // Losses are absolute values in the payload
          newGains.stcg.losses += Math.abs(holding.stcg.gain);
        }

        // Process long term gains
        if (holding.ltcg.gain > 0) {
          newGains.ltcg.profits += holding.ltcg.gain;
        } else if (holding.ltcg.gain < 0) {
          newGains.ltcg.losses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    return newGains;
  }, [initialCapitalGains, selectedCoins, holdings]);

  const handleToggleSelection = (coin: string) => {
    setSelectedCoins(prev => 
      prev.includes(coin) 
        ? prev.filter(c => c !== coin)
        : [...prev, coin]
    );
  };

  const handleToggleAll = (displayedCoins: string[]) => {
    // Check if all currently displayed coins are already selected
    const allDisplayedSelected = displayedCoins.every(coin => selectedCoins.includes(coin));
    
    if (allDisplayedSelected) {
      // Deselect only the currently displayed coins
      setSelectedCoins(prev => prev.filter(c => !displayedCoins.includes(c)));
    } else {
      // Select all currently displayed coins, keeping existing selections
      setSelectedCoins(prev => Array.from(new Set([...prev, ...displayedCoins])));
    }
  };

  const [isBannerOpen, setIsBannerOpen] = useState(true);

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      
      {/* Header section with tooltip */}
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Tax Optimisation</h1>
        <Tooltip
          content={
            <div className="flex flex-col space-y-2">
              <ul className="list-disc pl-4 space-y-1">
                <li>See your capital gains for FY 2024-25 in the left card</li>
                <li>Check boxes for assets you plan on selling to reduce your tax liability</li>
                <li>Instantly see your updated tax liability in the right card</li>
              </ul>
              <div className="mt-2 text-primary font-medium border-t border-gray-200 pt-2">
                Pro tip: Experiment with different combinations of your holdings to optimize your tax liability
              </div>
            </div>
          }
        >
          <button className="text-primary hover:text-blue-400 transition-colors flex items-center text-sm font-medium ml-4">
            How it works? <Info className="w-4 h-4 ml-1" />
          </button>
        </Tooltip>
      </div>

      {/* Info Banner Accordion */}
      <div className="bg-[#111928] border border-[#1f2937] rounded-xl overflow-hidden">
        <button 
          onClick={() => setIsBannerOpen(!isBannerOpen)}
          className="w-full flex items-center justify-between p-4 bg-[#1e3a8a]/20 hover:bg-[#1e3a8a]/30 transition-colors text-blue-100"
        >
          <div className="flex items-center space-x-2">
            <Info className="w-5 h-5 text-blue-400" />
            <span className="font-semibold text-sm">Important Notes And Disclaimers</span>
          </div>
          <svg 
            className={`w-5 h-5 transform transition-transform ${isBannerOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isBannerOpen && (
          <div className="p-5 text-sm text-gray-300 space-y-4 border-t border-[#1f2937]/50">
            <p className="flex items-start">
              <span className="text-gray-500 mr-2 font-bold">•</span>
              <span><strong className="text-gray-200">Price Source Disclaimer:</strong> Please note that the current price of your coins may differ from the prices listed on specific exchanges. This is because we use <strong className="text-gray-200">CoinGecko</strong> as our default price source for certain exchanges, rather than fetching prices directly from the exchange.</span>
            </p>
            <p className="flex items-start">
              <span className="text-gray-500 mr-2 font-bold">•</span>
              <span><strong className="text-gray-200">Country-specific Availability:</strong> Tax loss harvesting may <strong className="text-gray-200">not be supported in all countries</strong>. We strongly recommend consulting with your local tax advisor or accountant before performing any related actions on your exchange.</span>
            </p>
            <p className="flex items-start">
              <span className="text-gray-500 mr-2 font-bold">•</span>
              <span><strong className="text-gray-200">Utilization of Losses:</strong> Tax loss harvesting typically allows you to offset capital gains. However, if you have <strong className="text-gray-200">zero or no applicable crypto capital gains</strong>, the usability of these harvested losses may be limited. Kindly confirm with your tax advisor how such losses can be applied in your situation.</span>
            </p>
          </div>
        )}
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PreHarvestingCard gains={initialCapitalGains} />
        <AfterHarvestingCard gains={updatedGains} preHarvestingTotal={preHarvestingTotal} />
      </div>

      {/* Table Section */}
      <HoldingsTable 
        holdings={holdings}
        selectedCoins={selectedCoins}
        onToggleSelection={handleToggleSelection}
        onToggleAll={handleToggleAll}
      />

    </div>
  );
};

export default Dashboard;
