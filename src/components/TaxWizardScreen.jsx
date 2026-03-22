import { useState } from 'react'
import { calculateTax } from '../utils/taxCalculator'

export default function TaxWizardScreen({ onBack, onComplete }) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    basicSalary: '',
    hra: '',
    rentPaid: '',
    otherIncome: '',
    medicalPremium: '',
    homeLoanInterest: '',
    nps: '',
    otherDeductions: '',
    elss: '',
    epf: '',
    ppf: '',
    lifeInsurance: '',
    homeLoanPrincipal: '',
    nsc: ''
  })

  // Calculate total 80C dynamically
  const elss = parseInt(formData.elss) || 0
  const epf = parseInt(formData.epf) || 0
  const ppf = parseInt(formData.ppf) || 0
  const lifeIns = parseInt(formData.lifeInsurance) || 0
  const homePrin = parseInt(formData.homeLoanPrincipal) || 0
  const nsc = parseInt(formData.nsc) || 0
  const total80C = elss + epf + ppf + lifeIns + homePrin + nsc

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsLoading(true)
      try {
        const payload = { ...formData, total80C }
        for (let key in payload) {
          payload[key] = parseInt(payload[key]) || 0
        }
        const results = await calculateTax(payload)
        onComplete(payload, results)
      } catch (e) {
        alert("Error calculating tax. " + e.message)
        setIsLoading(false)
      }
    }
  }

  const steps = ["Income", "Deductions", "Investments", "Results"]

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-56px)] bg-[#111111] w-full flex flex-col items-center justify-center relative p-6">
        <div className="w-16 h-16 border-4 border-[#333333] border-t-et-red rounded-full animate-spin mb-8"></div>
        <h2 className="text-white text-2xl lg:text-3xl font-black mb-4">Calculating your tax savings...</h2>
      </div>
    )
  }

  const inputClass = "w-full h-12 border border-[#E5E5E5] rounded-[4px] px-4 text-base focus:outline-none focus:border-et-black focus:ring-1 focus:ring-et-black transition-colors"
  const labelClass = "text-[13px] font-bold text-et-gray uppercase tracking-widest mb-2 block"
  const helperClass = "text-[11px] text-[#999999] italic mt-1.5"

  return (
    <div className="min-h-[calc(100vh-56px)] bg-white w-full flex flex-col items-center py-6 md:py-12 px-4 relative">
      <div className="w-full max-w-[520px] mx-auto w-full">
        <button onClick={() => step === 1 ? onBack() : setStep(step - 1)} className="text-et-gray font-medium text-sm flex items-center gap-1 hover:text-et-black mb-8">
          ← Back
        </button>

        {/* Progress Bar */}
        <div className="flex items-center justify-between relative mb-12">
          <div className="absolute left-0 right-0 top-[4px] md:top-[6px] h-0.5 bg-[#E5E5E5] z-0"></div>
          <div className="absolute left-0 top-[4px] md:top-[6px] h-0.5 bg-et-black z-0 transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          
          {steps.map((s, i) => {
            const num = i + 1
            const isCompleted = step > num
            const isActive = step === num
            return (
              <div key={num} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-et-red' : isCompleted ? 'bg-et-black' : 'bg-[#E5E5E5]'}`}>
                   {isCompleted && <span className="text-white text-[8px] md:text-[10px]">✓</span>}
                </div>
                <span className={`text-[10px] md:text-[12px] font-bold whitespace-nowrap ${isActive ? 'text-et-black' : isCompleted ? 'text-et-black' : 'text-et-gray hidden md:block'}`}>{s}</span>
              </div>
            )
          })}
        </div>

        {step === 1 && (
          <div className="w-full animate-fade-in">
            <h1 className="text-[28px] font-black text-et-black leading-none mb-1">Your income details</h1>
            <p className="text-et-gray text-sm mb-8">FY 2025-26 (April 2025 - March 2026)</p>
            
            <div className="flex flex-col gap-6">
              <div>
                <label className={labelClass}>BASIC SALARY</label>
                <input type="number" name="basicSalary" value={formData.basicSalary} onChange={handleChange} placeholder="e.g. 1200000" className={inputClass} />
                <p className={helperClass}>Your fixed annual salary before any deductions</p>
                {formData.basicSalary && <p className="text-et-black text-xs font-bold mt-2">₹{parseInt(formData.basicSalary).toLocaleString('en-IN')} per year</p>}
              </div>
              <div>
                <label className={labelClass}>HRA RECEIVED</label>
                <input type="number" name="hra" value={formData.hra} onChange={handleChange} placeholder="e.g. 240000" className={inputClass} />
                <p className={helperClass}>House Rent Allowance from your employer (check salary slip)</p>
              </div>
              <div>
                <label className={labelClass}>RENT PAID ANNUALLY</label>
                <input type="number" name="rentPaid" value={formData.rentPaid} onChange={handleChange} placeholder="e.g. 180000" className={inputClass} />
                <p className={helperClass}>Total rent paid. Enter 0 if you don't pay rent</p>
              </div>
              <div>
                <label className={labelClass}>OTHER INCOME (OPTIONAL)</label>
                <input type="number" name="otherIncome" value={formData.otherIncome} onChange={handleChange} placeholder="e.g. 50000" className={inputClass} />
                <p className={helperClass}>Interest income, freelance, rental income, etc.</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full animate-fade-in">
            <h1 className="text-[28px] font-black text-et-black leading-none mb-1">Your deductions</h1>
            <p className="text-et-gray text-sm mb-8">These reduce your taxable income under old regime</p>
            
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-bold text-et-gray uppercase tracking-widest block m-0">HEALTH INSURANCE PREMIUM (80D)</label>
                  <span className="bg-[#F5F5F5] text-et-gray text-[10px] font-bold px-2 py-0.5 rounded-full">Max: ₹25,000</span>
                </div>
                <input type="number" name="medicalPremium" value={formData.medicalPremium} onChange={handleChange} placeholder="e.g. 25000" className={inputClass} />
                <p className={helperClass}>Premium paid for self, spouse, children</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-bold text-et-gray uppercase tracking-widest block m-0">HOME LOAN INTEREST (SEC 24)</label>
                  <span className="bg-[#F5F5F5] text-et-gray text-[10px] font-bold px-2 py-0.5 rounded-full">Max: ₹2,00,000</span>
                </div>
                <input type="number" name="homeLoanInterest" value={formData.homeLoanInterest} onChange={handleChange} placeholder="e.g. 200000" className={inputClass} />
                <p className={helperClass}>Interest paid on home loan this year</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[13px] font-bold text-et-gray uppercase tracking-widest block m-0">NPS CONTRIBUTION (80CCD 1B)</label>
                  <span className="bg-[#F5F5F5] text-et-gray text-[10px] font-bold px-2 py-0.5 rounded-full">Max: ₹50,000</span>
                </div>
                <input type="number" name="nps" value={formData.nps} onChange={handleChange} placeholder="e.g. 50000" className={inputClass} />
                <p className={helperClass}>Additional NPS contribution over 80C</p>
              </div>
              <div>
                <label className={labelClass}>OTHER DEDUCTIONS (80G, 80E)</label>
                <input type="number" name="otherDeductions" value={formData.otherDeductions} onChange={handleChange} placeholder="e.g. 10000" className={inputClass} />
                <p className={helperClass}>Donations, education loan interest, etc.</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full animate-fade-in">
            <h1 className="text-[28px] font-black text-et-black leading-none mb-1">Your 80C investments</h1>
            <p className="text-et-gray text-sm mb-6">80C limit is ₹1,50,000 per year</p>
            
            {/* Live limit bar */}
            <div className="w-full bg-[#F8F8F8] border border-[#E5E5E5] p-3 rounded-[4px] mb-8">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className={total80C >= 150000 ? "text-[#16A34A]" : "text-et-black"}>
                  {total80C >= 150000 ? "Limit reached ✓" : `80C used: ₹${total80C.toLocaleString('en-IN')} / ₹1,50,000`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E5E5] rounded-full overflow-hidden">
                 <div className={`h-full transition-all ${total80C >= 150000 ? 'bg-[#16A34A]' : 'bg-et-red'}`} style={{ width: `${Math.min((total80C / 150000) * 100, 100)}%` }}></div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <div>
                <label className={labelClass}>ELSS MUTUAL FUNDS</label>
                <input type="number" name="elss" value={formData.elss} onChange={handleChange} placeholder="e.g. 50000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>EPF CONTRIBUTION</label>
                <input type="number" name="epf" value={formData.epf} onChange={handleChange} placeholder="e.g. 72000" className={inputClass} />
                <p className={helperClass}>Your share of Provident Fund (check salary slip)</p>
              </div>
              <div>
                <label className={labelClass}>PPF CONTRIBUTION</label>
                <input type="number" name="ppf" value={formData.ppf} onChange={handleChange} placeholder="e.g. 50000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>LIFE INSURANCE PREMIUM</label>
                <input type="number" name="lifeInsurance" value={formData.lifeInsurance} onChange={handleChange} placeholder="e.g. 15000" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>HOME LOAN PRINCIPAL</label>
                <input type="number" name="homeLoanPrincipal" value={formData.homeLoanPrincipal} onChange={handleChange} placeholder="e.g. 0" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>NSC / TAX SAVING FD</label>
                <input type="number" name="nsc" value={formData.nsc} onChange={handleChange} placeholder="e.g. 0" className={inputClass} />
              </div>
            </div>
            
            <div className="mt-6 border-t border-[#E5E5E5] pt-4 flex flex-col items-center">
              <p className="text-et-black font-black text-lg">Total 80C: ₹{total80C.toLocaleString('en-IN')}</p>
              {total80C > 150000 && <p className="text-et-red text-xs mt-1 font-bold">Only ₹1,50,000 will be counted</p>}
            </div>
          </div>
        )}

        <div className="mt-8 pt-6">
           <button 
             onClick={handleNext} 
             disabled={step === 1 && !formData.basicSalary}
             className={`w-full font-bold py-3.5 px-6 transition-colors rounded-[4px] text-base h-12 flex items-center justify-center ${step === 1 && !formData.basicSalary ? 'bg-[#E5E5E5] text-[#999999] cursor-not-allowed' : 'bg-et-red hover:bg-[#C00025] text-white'}`}
           >
             {step < 3 ? 'Continue →' : 'Calculate My Taxes'}
           </button>
        </div>

      </div>
    </div>
  )
}
