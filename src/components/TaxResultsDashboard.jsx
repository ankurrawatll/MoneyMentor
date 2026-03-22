export default function TaxResultsDashboard({ data, formData, onBack, onGoToPortfolio }) {
  if (!data) return null

  const recRegime = data.recommendedRegime.toUpperCase()
  const oldWins = recRegime === 'OLD'

  function handleWhatsAppShare() {
    const text = `💸 My tax savings: ₹${data.savings.toLocaleString('en-IN')}/year by switching to the ${recRegime} regime.\n\nCheck your ideal tax regime for FY 2025-26 under 2 minutes 👇\nhttps://mf-xray.vercel.app`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] w-full flex flex-col pb-20">
      
      {/* TOP SECTION: THE VERDICT */}
      <div className="w-full bg-[#111111] text-white pt-10 pb-12 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
           <div className="text-center md:text-left flex-1">
             <span className="text-[#999999] text-[11px] font-bold uppercase tracking-[0.1em]">RECOMMENDED REGIME</span>
             <h1 className="text-[40px] md:text-[48px] font-black leading-none mt-2 mb-2">{recRegime} REGIME</h1>
             <p className="text-[#16A34A] text-base font-bold">Saves you ₹{data.savings.toLocaleString('en-IN')} more this year</p>
           </div>
           
           <div className="flex gap-8 border-t border-[#333333] pt-6 md:border-0 md:pt-0 w-full md:w-auto overflow-hidden">
             <div className="flex-1 min-w-[140px]">
               <p className="text-[#999999] text-[12px] font-medium mb-1">Old Regime Tax</p>
               <p className={`text-[24px] font-black pb-1 leading-none ${oldWins ? 'text-white border-b-2 border-[#16A34A] inline-block' : 'text-et-red'}`}>
                 {data.oldRegime.totalTax === 0 ? 'NIL' : `₹${data.oldRegime.totalTax.toLocaleString('en-IN')}`}
               </p>
             </div>
             <div className="flex-1 min-w-[140px]">
               <p className="text-[#999999] text-[12px] font-medium mb-1">New Regime Tax</p>
               <p className={`text-[24px] font-black pb-1 leading-none ${!oldWins ? 'text-white border-b-2 border-[#16A34A] inline-block' : 'text-et-red'}`}>
                 {data.newRegime.totalTax === 0 ? 'NIL' : `₹${data.newRegime.totalTax.toLocaleString('en-IN')}`}
               </p>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-10 mt-10">
        
        {/* SECTION 2: THE MATH */}
        <h2 className="text-xl font-bold text-et-black mb-6">How we calculated this</h2>
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          
          <div className="flex-1 bg-white border border-[#E5E5E5] p-6 rounded-[4px] shadow-sm">
            <h3 className="text-base font-bold text-et-black mb-4">Old Regime</h3>
            <div className="flex flex-col gap-2.5 text-[13px] border-b border-[#E5E5E5] pb-4 mb-4">
               <div className="flex justify-between"><span className="text-et-gray">Gross Income</span><span className="font-medium text-et-black">₹{data.oldRegime.grossIncome.toLocaleString('en-IN')}</span></div>
               <div className="flex justify-between"><span className="text-et-gray">Standard Deduction</span><span className="text-et-red">-₹{data.oldRegime.standardDeduction.toLocaleString('en-IN')}</span></div>
               {data.oldRegime.hraExemption > 0 && <div className="flex justify-between"><span className="text-et-gray">HRA Exemption</span><span className="text-et-red">-₹{data.oldRegime.hraExemption.toLocaleString('en-IN')}</span></div>}
               {data.oldRegime.deduction80C > 0 && <div className="flex justify-between"><span className="text-et-gray">80C Deductions</span><span className="text-et-red">-₹{data.oldRegime.deduction80C.toLocaleString('en-IN')}</span></div>}
               {data.oldRegime.deduction80D > 0 && <div className="flex justify-between"><span className="text-et-gray">80D Premium</span><span className="text-et-red">-₹{data.oldRegime.deduction80D.toLocaleString('en-IN')}</span></div>}
               {data.oldRegime.deductionNPS > 0 && <div className="flex justify-between"><span className="text-et-gray">NPS (80CCD)</span><span className="text-et-red">-₹{data.oldRegime.deductionNPS.toLocaleString('en-IN')}</span></div>}
               {data.oldRegime.homeLoanInterest > 0 && <div className="flex justify-between"><span className="text-et-gray">Home Loan Interest</span><span className="text-et-red">-₹{data.oldRegime.homeLoanInterest.toLocaleString('en-IN')}</span></div>}
               {data.oldRegime.otherDeductions > 0 && <div className="flex justify-between"><span className="text-et-gray">Other Deductions</span><span className="text-et-red">-₹{data.oldRegime.otherDeductions.toLocaleString('en-IN')}</span></div>}
            </div>
            <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4 mb-4">
              <div className="flex justify-between text-[14px] font-bold"><span className="text-et-black">Taxable Income</span><span>₹{data.oldRegime.taxableIncome.toLocaleString('en-IN')}</span></div>
              {data.oldRegime.rebate87A > 0 && <div className="flex justify-between text-[13px]"><span className="text-[#16A34A]">87A Rebate</span><span className="text-[#16A34A]">-₹{data.oldRegime.rebate87A.toLocaleString('en-IN')}</span></div>}
              <div className="flex justify-between text-[13px]"><span className="text-et-gray">Tax Base</span><span className="text-et-red font-bold">₹{data.oldRegime.taxBeforeCess.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-et-gray">Health & Edu Cess (4%)</span><span className="text-et-black">₹{data.oldRegime.cess.toLocaleString('en-IN')}</span></div>
            </div>
            <div className="flex justify-between text-[18px] font-black w-full">
              <span>Total Tax</span>
              <span>₹{data.oldRegime.totalTax.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[#999999] text-[10px] mt-4 leading-tight">Old regime slabs: 0-2.5L: Nil, 2.5-5L: 5%, 5-10L: 20%, 10L+: 30%</p>
          </div>
          
          <div className="flex-1 bg-white border border-[#E5E5E5] p-6 rounded-[4px] shadow-sm flex flex-col">
            <h3 className="text-base font-bold text-et-black mb-4">New Regime</h3>
            <div className="flex flex-col gap-2.5 text-[13px] border-b border-[#E5E5E5] pb-4 mb-4">
               <div className="flex justify-between"><span className="text-et-gray">Gross Income</span><span className="font-medium text-et-black">₹{data.newRegime.grossIncome.toLocaleString('en-IN')}</span></div>
               <div className="flex justify-between"><span className="text-et-gray">Standard Deduction</span><span className="text-et-red">-₹{data.newRegime.standardDeduction.toLocaleString('en-IN')}</span></div>
            </div>
            <div className="flex flex-col gap-2 border-b border-[#E5E5E5] pb-4 mb-4">
              <div className="flex justify-between text-[14px] font-bold"><span className="text-et-black">Taxable Income</span><span>₹{data.newRegime.taxableIncome.toLocaleString('en-IN')}</span></div>
              {data.newRegime.rebate87A > 0 && <div className="flex justify-between text-[13px]"><span className="text-[#16A34A]">87A Rebate</span><span className="text-[#16A34A]">-₹{data.newRegime.rebate87A.toLocaleString('en-IN')}</span></div>}
              <div className="flex justify-between text-[13px]"><span className="text-et-gray">Tax (as per slab)</span><span className="text-et-red font-bold">₹{data.newRegime.taxBeforeCess.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between text-[13px]"><span className="text-et-gray">Health & Edu Cess (4%)</span><span className="text-et-black">₹{data.newRegime.cess.toLocaleString('en-IN')}</span></div>
            </div>
            <div className="flex justify-between text-[18px] font-black w-full">
              <span>Total Tax</span>
              <span>₹{data.newRegime.totalTax.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[#999999] text-[10px] mt-auto pt-4 leading-tight">New regime slabs: 0-4L: Nil, 4-8L: 5%, 8-12L: 10%, 12-16L: 15%, 16-20L: 20%, 20-24L: 25%, 24L+: 30%</p>
          </div>
          
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          
          <div className="flex-1">
             {/* SECTION 3: MISSING DEDUCTIONS */}
             <div className="mb-8">
               <h2 className="text-xl font-bold text-et-black mb-1">Deductions you haven't used</h2>
               <p className="text-et-gray text-sm mb-6">These could save you more tax under old regime</p>
               <div className="flex flex-col gap-3">
                 <div className="bg-white border text-[#999999] border-[#E5E5E5] p-4 rounded-[4px] flex justify-between items-center opacity-70">
                   <div className="flex items-center gap-3"><span className="text-[16px]">✓</span><span className="font-bold text-sm">Standard Deduction (₹50k)</span></div>
                   <span className="text-xs">Already applied</span>
                 </div>
                 {data.missedDeductions?.map((d, i) => (
                   <div key={i} className="bg-white border border-[#E5E5E5] p-4 md:p-5 rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:border-et-red transition-colors">
                     <div>
                       <h4 className="font-bold text-et-black text-sm mb-1">{d.name}</h4>
                       <p className="text-[12px] text-et-gray">{d.action}</p>
                     </div>
                     <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                        <span className="text-[#16A34A] font-bold text-sm">Save up to ₹{d.potentialSaving?.toLocaleString('en-IN') || '0'}</span>
                        <a href="https://economictimes.indiatimes.com/wealth/tax" target="_blank" rel="noreferrer" className="text-et-red text-[11px] font-bold mt-1.5 hover:underline">How to claim →</a>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
          
          <div className="w-full lg:w-[400px]">
             {/* SECTION 4: ACTION PLAN */}
             <div className="bg-et-black text-white p-6 rounded-[4px] border border-[#333333] shadow-lg sticky top-6">
                <span className="text-et-red text-[11px] font-bold tracking-[0.1em] mb-6 block uppercase">YOUR TAX ACTION PLAN</span>
                
                <div className="flex flex-col gap-5 mb-8">
                  <div className="flex gap-4">
                    <span className="text-et-red text-xs font-bold font-mono shrink-0 mt-0.5">01</span>
                    <div>
                      <p className="font-bold text-sm mb-0.5">{data.actionPlan?.action1 || `Switch to ${recRegime.toLowerCase()} regime`}</p>
                      <p className="text-[#16A34A] text-[11px] font-bold">→ {data.actionPlan?.action1Sub || `Save ₹${data.savings.toLocaleString('en-IN')} this financial year`}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-et-red text-xs font-bold font-mono shrink-0 mt-0.5">02</span>
                    <div>
                      <p className="font-bold text-sm mb-0.5">{data.actionPlan?.action2 || (data.missedDeductions && data.missedDeductions[0]?.name) || "Explore new deductions"}</p>
                      <p className="text-[#16A34A] text-[11px] font-bold">→ {data.actionPlan?.action2Sub || (data.missedDeductions && `Save up to ₹${data.missedDeductions[0]?.potentialSaving?.toLocaleString('en-IN')}`) || "Reduce tax liability"}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-et-red text-xs font-bold font-mono shrink-0 mt-0.5">03</span>
                    <div>
                      <p className="font-bold text-sm mb-0.5">File before July 31, 2026</p>
                      <p className="text-[#16A34A] text-[11px] font-bold">→ Avoid ₹5,000 late filing penalty</p>
                    </div>
                  </div>
                </div>
                
                <button onClick={handleWhatsAppShare} className="w-full bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold py-3.5 px-6 transition-colors rounded-[8px] text-sm mb-3 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .004 5.383.004 12.033c0 2.127.553 4.195 1.6 6.01L.004 24l6.096-1.598A11.96 11.96 0 0 0 12.031 24c6.643 0 12.023-5.385 12.023-12.033S18.674 0 12.031 0"/><path fill="white" d="M19.14 17.15c-.41 1.15-2.28 2.08-3.32 2.23-1.04.16-2.08.38-5.38-1.01-4.04-1.68-6.66-5.83-6.87-6.1-.21-.28-1.66-2.2-1.66-4.18s1.04-2.96 1.4-3.38c.36-.4.82-.5 1.14-.5h.58c.32 0 .72-.11 1.13.88.42 1.01.99 2.45 1.09 2.65.1.2.2.45.1.72-.1.28-.15.46-.35.7-.2.25-.43.52-.62.72-.2.2-.42.42-.18.84.22.41 1.01 1.69 2.16 2.73 1.49 1.34 2.72 1.76 3.12 1.96.41.21.68.16.94-.13.26-.3.65-.89 1.01-1.35.37-.46.75-.38 1.16-.23.41.15 2.62 1.25 3.07 1.48.45.22.75.35.86.53.1.21.1 1.24-.31 2.39"/></svg>
                  Share on WhatsApp
                </button>
                
                <button onClick={onGoToPortfolio} className="w-full bg-et-red hover:bg-[#C00025] text-white font-bold py-3.5 px-6 transition-colors rounded-[8px] text-sm">
                  Analyze My Portfolio Too →
                </button>
             </div>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}
