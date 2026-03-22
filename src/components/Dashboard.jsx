import SummaryBar from './cards/SummaryBar'
import XIRRCard from './cards/XIRRCard'
import OverlapCard from './cards/OverlapCard'
import ExpenseCard from './cards/ExpenseCard'
import RecommendCard from './cards/RecommendCard'
import HealthScoreIndicator from './HealthScoreIndicator'
import NewsSection from './NewsSection'

const SectionDivider = () => (
  <div className="w-full relative h-[1px] bg-[#E5E5E5] my-10 md:my-14 shrink-0">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-et-red"></div>
  </div>
)

export default function Dashboard({ data, onTaxWizardClick }) {
  if (!data) return null
  
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-et-surface w-full flex flex-col">
      <SummaryBar data={data} />
      
      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6 md:py-10 flex-1 flex flex-col">
        
        <HealthScoreIndicator data={data} />
        
        <NewsSection data={data} />
        
        {/* Section 1 Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-8 gap-2">
          <h2 className="text-[28px] md:text-[36px] font-bold leading-none tracking-tight">
            <span className="text-et-gray">Your </span>
            <span className="text-et-black">Portfolio</span>
          </h2>
          <div className="text-et-muted text-xs md:text-sm font-medium flex items-center gap-3">
            <span>{data.investorName}</span>
            <span className="w-1 h-1 rounded-full bg-et-border"></span>
            <span>{today}</span>
          </div>
        </div>

        {/* Top Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 mb-6 md:mb-8 w-full">
          
          {/* XIRR Card Area */}
          <div className="w-full lg:w-[60%] shrink-0">
            <XIRRCard data={data} />
          </div>
          
          {/* Fund List Table Area */}
          <div className="w-full lg:w-[40%] bg-white border border-et-border rounded-[4px] p-4 md:p-6 overflow-hidden flex flex-col justify-start h-full">
            <span className="text-et-gray text-[11px] font-bold tracking-[0.1em] mb-4 block uppercase flex-shrink-0">FUND HOLDINGS</span>
            <div className="overflow-auto border-t border-et-border flex-1">
              <table className="w-full text-left border-collapse min-w-[320px]">
                <thead>
                  <tr className="border-b border-et-border text-[11px] text-et-muted uppercase">
                    <th className="py-3 px-2 font-medium">Fund Name</th>
                    <th className="py-3 px-2 font-medium text-right">Value</th>
                    <th className="py-3 px-2 font-medium text-right bg-et-surface/50">XIRR</th>
                  </tr>
                </thead>
                <tbody>
                  {data.funds.map((fund, idx) => (
                    <tr key={idx} className="border-b border-et-border border-opacity-40 hover:bg-et-surface transition-colors">
                      <td className="py-3.5 px-2 text-[13px] font-bold text-et-black max-w-[160px] truncate" title={fund.name}>
                        {fund.name}
                        <div className="text-[10px] text-et-gray font-normal mt-0.5">{fund.planType} • {fund.category}</div>
                      </td>
                      <td className="py-3 px-2 text-[13px] font-medium text-et-black text-right stat-number">
                        ₹{fund.currentValue.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-2 text-[13px] font-bold text-et-black text-right stat-number bg-et-surface/30">
                        {fund.xirr.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>

        <SectionDivider />

        {/* Middle Layout Grid */}
        <div className="w-full">
          <OverlapCard data={data} />
        </div>

        <SectionDivider />

        {/* Section 2 Header */}
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <h2 className="text-[28px] md:text-[36px] font-bold leading-none tracking-tight text-et-black">
            What to do next
          </h2>
          <div className="text-et-red text-sm md:text-base font-bold flex items-center gap-2">
            3 actions
          </div>
        </div>

        {/* Bottom Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch w-full">
          <div className="w-full lg:w-[55%] shrink-0 flex">
            <ExpenseCard data={data} />
          </div>
          
          <div className="w-full lg:w-[45%] flex flex-col gap-6">
            <div className="flex-1 w-full">
              <RecommendCard data={data} />
            </div>
            
            <div className="bg-white border text-et-black border-et-border hover:border-et-red transition-colors duration-200 border-l-[4px] border-l-et-red p-5 md:p-6 w-full flex flex-col rounded-[4px] shrink-0">
              <span className="text-et-gray text-[11px] font-bold tracking-[0.1em] mb-4 block uppercase flex-shrink-0">Check your tax savings too →</span>
              <h3 className="text-[16px] font-bold text-et-black mb-1">Tax Wizard</h3>
              <p className="text-et-gray text-[13px] mb-4">See if you're on the right tax regime. Takes 2 minutes.</p>
              <button onClick={onTaxWizardClick} className="text-et-red font-bold text-[14px] text-left hover:underline w-fit">
                Calculate Tax Savings →
              </button>
            </div>
          </div>
        </div>

      </main>

      <footer className="w-full bg-[#111111] border-t-2 border-t-et-red" style={{ marginTop: 0, padding: '24px 40px', minHeight: 'auto' }}>
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-xs font-medium">MF Portfolio X-Ray | Built by Ankur Rawat for ET</p>
          <p className="text-et-gray text-xs font-medium flex items-center gap-1.5">
            built with AI
          </p>
        </div>
      </footer>
    </div>
  )
}
