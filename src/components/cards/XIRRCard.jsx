import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'

export default function XIRRCard({ data }) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])
  const xirrColor = data.xirr < 10 ? 'text-et-red' : data.xirr > 12 ? 'text-[#16A34A]' : 'text-et-black'
  
  const chartData = [
    { name: 'Your XIRR', value: data.xirr, color: '#E8002D', isYou: true },
    { name: 'Nifty 50 avg', value: data.xirrBenchmark, color: '#111111', isYou: false },
    { name: 'Fixed Deposit', value: data.xirrVsFD, color: '#555555', isYou: false },
    { name: 'Inflation', value: 5.8, color: '#999999', isYou: false }
  ].sort((a, b) => b.value - a.value)

  return (
    <div className="bg-white border text-et-black border-et-border hover:border-r-et-red hover:border-t-et-red hover:border-b-et-red transition-colors duration-200 border-l-[4px] border-l-et-red overflow-hidden flex flex-col h-full rounded-[4px] w-full">
      <div className="p-4 md:p-6 flex flex-col lg:flex-row flex-1 gap-8">
        
        {/* Left Side */}
        <div className="w-full lg:w-[60%] flex flex-col">
          <span className="text-et-red text-[11px] font-bold tracking-[0.1em] mb-2 block uppercase">REAL RETURNS</span>
          <div className="flex items-baseline mb-4">
            <span className={`text-[48px] lg:text-[64px] font-black stat-number leading-none tracking-tight ${xirrColor}`}>
              {data.xirr.toFixed(1)}
            </span>
            <span className="text-et-muted text-sm ml-2 font-medium">% per annum</span>
          </div>
          <p className="text-et-gray italic text-sm mt-auto max-w-sm">"{data.xirrComment}"</p>
        </div>

        {/* Right Side - Comparison */}
        <div className="w-full lg:w-[40%] flex flex-col justify-end min-h-[160px]">
          <div className="h-full w-full relative">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={90} tick={{ fontSize: 11, fill: '#555555', fontWeight: 500 }} />
                  <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={12} label={{ position: 'right', fill: '#111111', fontSize: 11, fontWeight: 700, formatter: (val) => `${val}%` }}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-et-border p-4 md:p-6 bg-et-surface flex items-center justify-center gap-4 text-sm font-medium">
        <span className="text-et-gray">Invested <span className="text-et-black font-bold stat-number">₹{data.totalInvested.toLocaleString('en-IN')}</span></span>
        <svg className="w-4 h-4 text-et-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        <span className="text-et-gray">Current <span className="text-et-black font-bold stat-number">₹{data.currentValue.toLocaleString('en-IN')}</span></span>
      </div>
    </div>
  )
}
