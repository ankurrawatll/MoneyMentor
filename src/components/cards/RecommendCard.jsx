export default function RecommendCard({ data }) {
  const recommendations = data.recommendations

  function handleWhatsAppShare() {
    const text = `🔍 Just analyzed my mutual fund portfolio with MF Portfolio X-Ray!\n\n📊 My Results:\n• Real Returns (XIRR): ${data.xirr}% p.a.\n• Portfolio Value: ₹${(data.currentValue/100000).toFixed(1)}L\n• I'm losing ₹${data.expenseDrag.lossOver20Years.toLocaleString('en-IN')} to fees over 20 years\n• Switching to direct plans saves ₹${data.expenseDrag.annualFeesDirect.toLocaleString('en-IN')}/year\n\nAnalyze yours free 👇\nhttps://mf-xray.vercel.app`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="bg-et-black border border-[#333333] hover:border-et-red transition-colors duration-200 p-4 md:p-6 w-full flex flex-col h-full rounded-[4px] overflow-hidden">
      
      <span className="text-et-red text-[11px] font-bold tracking-[0.1em] mb-6 block uppercase">YOUR ACTION PLAN</span>

      <div className="flex flex-col flex-1 gap-4 mb-8">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex gap-4 pb-4 border-b border-white border-opacity-10 last:border-0 last:pb-0">
            {/* Priority Indicator */}
            <div className={`w-[3px] shrink-0 mt-1.5 ${rec.priority === 'high' ? 'bg-et-red' : 'bg-et-gray'}`}></div>
            
            <div className="flex-1">
              <div className="flex gap-2 items-baseline mb-1">
                <span className="text-et-red text-xs font-bold font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                <h4 className="text-white text-base font-bold leading-tight">{rec.title}</h4>
              </div>
              
              <p className="text-et-gray text-[13px] leading-snug mb-2 pl-[22px]">
                {rec.detail}
              </p>
              
              <p className="text-[#16A34A] text-xs font-bold pl-[22px] flex items-start gap-1">
                <span className="shrink-0 mt-[-1px]">→</span>
                <span>{rec.impact}</span>
              </p>
              
              {/* Urgency Lines */}
              {rec.priority === 'high' && rec.title.toLowerCase().includes('direct') && (
                <p className="text-et-red italic text-[11px] mt-1.5 pl-[22px] flex items-start gap-1">
                  <span className="shrink-0">⏱</span> 
                  <span>Every month you delay costs you ₹{Math.round(data.expenseDrag.annualFeesDirect / 12).toLocaleString('en-IN')} in avoidable fees</span>
                </p>
              )}
              {rec.title.toLowerCase().includes('overlap') && (
                <p className="text-et-red italic text-[11px] mt-1.5 pl-[22px] flex items-start gap-1">
                  <span className="shrink-0">⏱</span> 
                  <span>Overlapping funds create false sense of security during market crashes</span>
                </p>
              )}
              {rec.title.toLowerCase().includes('sip') && (
                <p className="text-et-red italic text-[11px] mt-1.5 pl-[22px] flex items-start gap-1">
                  <span className="shrink-0">⏱</span> 
                  <span>Starting ₹2,000 more/month today beats ₹5,000 more/month 2 years later</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col items-center w-full">
        <button onClick={handleWhatsAppShare} className="w-full bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold py-3.5 px-6 transition-colors rounded-[8px] text-sm md:text-base mb-3 flex items-center justify-center gap-2">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 0C5.385 0 .004 5.383.004 12.033c0 2.127.553 4.195 1.6 6.01L.004 24l6.096-1.598A11.96 11.96 0 0 0 12.031 24c6.643 0 12.023-5.385 12.023-12.033S18.674 0 12.031 0"/>
            <path fill="white" d="M19.14 17.15c-.41 1.15-2.28 2.08-3.32 2.23-1.04.16-2.08.38-5.38-1.01-4.04-1.68-6.66-5.83-6.87-6.1-.21-.28-1.66-2.2-1.66-4.18s1.04-2.96 1.4-3.38c.36-.4.82-.5 1.14-.5h.58c.32 0 .72-.11 1.13.88.42 1.01.99 2.45 1.09 2.65.1.2.2.45.1.72-.1.28-.15.46-.35.7-.2.25-.43.52-.62.72-.2.2-.42.42-.18.84.22.41 1.01 1.69 2.16 2.73 1.49 1.34 2.72 1.76 3.12 1.96.41.21.68.16.94-.13.26-.3.65-.89 1.01-1.35.37-.46.75-.38 1.16-.23.41.15 2.62 1.25 3.07 1.48.45.22.75.35.86.53.1.21.1 1.24-.31 2.39"/>
          </svg>
          Share on WhatsApp
        </button>
        <div className="w-full h-px bg-[#333333] mb-3 opacity-50"></div>
        <button className="w-full bg-et-red hover:bg-[#C00025] text-white font-bold py-3.5 px-6 transition-colors rounded-[8px] text-sm md:text-base">
          Share Your Analysis
        </button>
        <p className="text-et-gray text-[11px] mt-4 flex items-center gap-1.5 w-full justify-center leading-tight">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Results calculated locally
        </p>
      </div>

    </div>
  )
}
