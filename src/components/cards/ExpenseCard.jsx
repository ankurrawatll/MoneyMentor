import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts'

export default function ExpenseCard({ data }) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  const ex = data.expenseDrag
  const formatLakhs = (val) => `${(val / 100000).toFixed(1)}L`
  
  const currentTotal = ex.wealthWithCurrentFees
  const optimalTotal = ex.wealthWithDirectFees
  
  const chartData = [0, 5, 10, 15, 20].map(year => {
    const fraction = Math.pow(year / 20, 1.5)
    return {
      year: `${year}y`,
      current: Math.round(data.totalInvested + (currentTotal - data.totalInvested) * fraction),
      optimal: Math.round(data.totalInvested + (optimalTotal - data.totalInvested) * fraction),
    }
  })

  const [delayMonths, setDelayMonths] = useState(12)
  const monthlyLoss = ex.annualFeesDirect / 12
  const totalLoss = monthlyLoss * delayMonths

  return (
    <div className="bg-white border text-et-black border-et-border hover:border-et-red transition-colors duration-200 p-4 md:p-6 w-full flex flex-col h-full rounded-[4px] overflow-hidden">
      
      {/* Top Row: The Big Number */}
      <div className="mb-8">
        <p className="text-et-gray text-[18px] font-medium leading-none mb-1">You are losing</p>
        <p className="text-et-red text-[48px] md:text-[56px] font-black leading-none stat-number tracking-tight my-1">
          ₹{ex.lossOver20Years.toLocaleString('en-IN')}
        </p>
        <p className="text-et-gray text-[18px] font-medium leading-none mt-1">to fees over 20 years</p>
        
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="bg-et-black text-white px-3 py-1.5 text-xs font-bold leading-none">
            Current fees: {ex.currentAvgExpenseRatio.toFixed(2)}% /yr
          </div>
          <div className="bg-white border border-et-red text-et-red px-3 py-1.5 text-xs font-bold leading-none">
            Optimal fees: {ex.recommendedExpenseRatio.toFixed(2)}% /yr
          </div>
        </div>
      </div>

      {/* Bottom Row: Chart */}
      <div className="flex-1 min-h-[160px] md:min-h-[200px] w-full mt-auto relative mb-6">
        {isMounted && (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart width={undefined} data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOptimal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FEF2F2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FEF2F2" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" axisLine={true} tickLine={false} tick={{ fontSize: 11, fill: '#999999' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999999' }} tickFormatter={formatLakhs} />
              
              <Area type="monotone" dataKey="optimal" stroke="#E8002D" strokeWidth={2} fillOpacity={1} fill="url(#colorOptimal)" />
              <Area type="monotone" dataKey="current" stroke="#111111" strokeWidth={2} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        )}
        
        {/* Simple Legend */}
        <div className="absolute top-0 left-8 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-et-red"></div>
            <span className="text-[10px] font-bold text-et-red">With direct funds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-et-black"></div>
            <span className="text-[10px] font-bold text-et-black">Your current path</span>
          </div>
        </div>
      </div>
      
      {/* Delay Cost Calculator Feature */}
      <div className="mt-8 border-t border-et-border pt-6 w-full">
         <h4 className="text-et-red text-[11px] font-bold tracking-[0.1em] mb-4 uppercase">Cost of waiting</h4>
         <div className="flex flex-col gap-4">
           <div className="flex justify-between text-[13px] font-bold border-b border-[#F5F5F5] pb-2">
             <span>If you switch to direct plans in...</span>
             <span className="text-et-red">{delayMonths} months</span>
           </div>
           
           <input 
             type="range" 
             min="0" 
             max="36" 
             step="1" 
             value={delayMonths} 
             onChange={(e) => setDelayMonths(parseInt(e.target.value))}
             className="w-full h-1.5 bg-et-border rounded-lg appearance-none cursor-pointer accent-et-red"
           />
           
           <p className="text-[13px] mt-3">
             Waiting {delayMonths} months costs you 
             <span className="text-[24px] font-bold text-et-black block mt-2">
               <span className="text-et-red mr-1">₹</span>
               {Math.round(totalLoss).toLocaleString('en-IN')}
             </span>
           </p>
         </div>
      </div>

    </div>
  )
}
