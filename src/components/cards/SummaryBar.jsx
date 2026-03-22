import { calculateHealthScore } from '../../utils/healthScore'

export default function SummaryBar({ data }) {
  const formatMoney = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`
    return `₹${val.toLocaleString('en-IN')}`
  }

  const invested = data.totalInvested
  const current = data.currentValue
  const gain = current - invested
  const gainPercent = (gain / invested) * 100
  const isPositive = gain >= 0
  
  const xirrColor = data.xirr >= 10 ? 'text-[#16A34A]' : data.xirr < 7 ? 'text-et-red' : 'text-white'
  
  const healthScore = calculateHealthScore(data)
  const healthColor = healthScore >= 70 ? 'text-[#16A34A]' : healthScore >= 50 ? 'text-[#D97706]' : 'text-et-red'

  return (
    <div className="bg-et-black text-white w-full py-8 md:py-12">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-8 lg:gap-0">
        
        {/* Left Side - 40% */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#333333] pb-8 lg:pb-0 lg:pr-10">
          <p className="text-[#666666] text-[11px] font-bold tracking-[0.1em] uppercase mb-2">CURRENT VALUE</p>
          <p className="text-[48px] md:text-[72px] font-black stat-number leading-none text-white tracking-tight mb-4">
            {formatMoney(current)}
          </p>
          <div>
            <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-[4px] ${isPositive ? 'bg-[#16A34A]/20 text-[#16A34A]' : 'bg-et-red/20 text-et-red'}`}>
              {isPositive ? '+' : ''}₹{Math.abs(gain).toLocaleString('en-IN')} ({isPositive ? '+' : ''}{gainPercent.toFixed(1)}%)
            </span>
          </div>
        </div>

        {/* Right Side - 60% */}
        <div className="w-full lg:w-[60%] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:pl-10">
          <div className="flex flex-col lg:justify-center">
            <p className="text-et-muted text-[11px] md:text-[13px] mb-1 font-medium uppercase tracking-wide">Total Invested</p>
            <p className="text-[24px] md:text-[32px] font-black stat-number leading-tight">{formatMoney(invested)}</p>
          </div>

          <div className="flex flex-col lg:justify-center border-l-0 lg:border-l border-[#333333] lg:pl-6">
            <p className="text-et-muted text-[11px] md:text-[13px] mb-1 font-medium uppercase tracking-wide">Real Returns</p>
            <p className={`text-[24px] md:text-[32px] font-black stat-number leading-tight ${xirrColor}`}>
              {data.xirr.toFixed(1)}%
            </p>
          </div>

          <div className="flex flex-col lg:justify-center border-l-0 lg:border-l border-[#333333] lg:pl-6">
            <p className="text-et-muted text-[11px] md:text-[13px] mb-1 font-medium uppercase tracking-wide">Abs Returns</p>
            <p className="text-[24px] md:text-[32px] font-black stat-number leading-tight">
              {data.absoluteReturn.toFixed(1)}%
            </p>
          </div>
          
          <div className="flex flex-col lg:justify-center border-l-0 lg:border-l border-[#333333] lg:pl-6">
            <p className="text-et-muted text-[11px] md:text-[13px] mb-1 font-medium uppercase tracking-wide">Health Score</p>
            <p className={`text-[24px] md:text-[32px] font-black stat-number leading-tight ${healthColor}`}>
              {healthScore}<span className="text-[14px] md:text-[16px] text-et-muted">/100</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
