export default function OverlapCard({ data }) {
  const score = data.overlapScore
  const badgeColor = score > 60 ? 'bg-et-red' : score >= 40 ? 'bg-[#D97706]' : 'bg-[#16A34A]'
  const badgeText = score > 60 ? 'HIGH OVERLAP' : score >= 40 ? 'MODERATE' : 'HEALTHY'

  return (
    <div className="bg-white border border-et-border hover:border-et-red transition-colors duration-200 rounded-[4px] p-4 md:p-6 w-full overflow-hidden flex flex-col">
      {/* Top Section */}
      <div className="mb-8">
        <span className="text-et-red text-[11px] font-bold tracking-[0.1em] mb-4 block uppercase flex-shrink-0">PORTFOLIO OVERLAP</span>
        <div className="flex flex-col md:flex-row md:items-end gap-x-4 gap-y-4">
          <span className="text-[48px] md:text-[64px] font-black stat-number leading-none text-et-black tracking-tight">{score}%</span>
          <div className="mb-1 flex-1">
            <p className="text-et-gray text-base leading-snug max-w-sm mb-3">of your portfolio <span className="text-et-black font-bold">owns the same stocks</span> across different funds.</p>
            <div className={`inline-flex px-2 px-1 text-[10px] font-bold text-white tracking-widest leading-none align-middle py-1 uppercase scale-100 ${badgeColor}`}>
              <span className="py-[1px] px-[2px]">{badgeText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Visual diagram */}
      {data.overlap && data.overlap.length > 0 && (
        <div className="mb-10 py-6 border-y border-et-border border-dashed">
          {data.overlap.map((pair, idx) => (
            <div key={idx} className="mb-12 md:mb-8 last:mb-0">
              <div className="flex flex-col md:flex-row justify-center items-center relative h-[140px] md:h-[80px] w-full max-w-lg mx-auto mb-4 px-0 md:px-4 overflow-hidden gap-1 md:gap-0">
                 {/* Left Box */}
                 <div className="relative md:absolute md:left-[5%] lg:left-[10%] w-full md:w-[50%] h-[60px] bg-et-surface border border-et-border flex items-center justify-center md:justify-start px-4 z-10 shadow-sm rounded-[4px]">
                    <span className="text-[12px] md:text-sm font-bold text-et-black truncate w-full md:w-[70%] text-center md:text-left" title={pair.fund1}>{pair.fund1}</span>
                 </div>
                 {/* Right Box (overlapping) */}
                 <div className="relative md:absolute md:right-[5%] lg:right-[10%] w-full md:w-[50%] h-[60px] bg-et-surface border border-et-border flex items-center justify-center md:justify-end px-4 z-20 shadow-sm md:mix-blend-multiply opacity-100 md:opacity-90 rounded-[4px] mt-1 md:mt-0">
                    <span className="text-[12px] md:text-sm font-bold text-et-black truncate w-full md:w-[70%] text-center md:text-right" title={pair.fund2}>{pair.fund2}</span>
                 </div>
                 {/* Overlap Highlight Box */}
                 <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[50px] h-[50px] md:w-[20%] md:h-[64px] bg-[#FEF2F2] border-2 border-et-red flex items-center justify-center z-30 font-black text-et-red text-sm md:text-lg shadow-sm rounded-full md:rounded-none">
                    {pair.overlapPercent}%
                 </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto px-2 mt-4 md:mt-0">
                {pair.commonStocks.map((stock, sIdx) => (
                  <span key={sIdx} className="bg-et-black text-white px-2.5 py-1 text-[11px] font-bold rounded-[2px] md:rounded-full">
                    {stock}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-auto">
        <h4 className="text-[11px] font-bold text-et-muted uppercase tracking-widest mb-4">Fund Breakdown</h4>
        <div className="flex flex-col gap-3">
          {data.funds.map((fund, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-2 text-sm">
              <div className="w-full sm:w-[45%]">
                <p className="font-bold text-et-black truncate pr-2" title={fund.name}>{fund.name}</p>
                <p className="text-[11px] text-et-gray">{fund.category}</p>
              </div>
              <div className="w-full sm:w-[55%] flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-et-surface rounded-full overflow-hidden">
                  <div className="h-full bg-et-red opacity-80" style={{ width: `${Math.min(fund.xirr * 3, 100)}%` }}></div>
                </div>
                <span className="font-bold text-et-black stat-number w-12 text-right">{fund.xirr.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
