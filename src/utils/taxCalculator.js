export async function calculateTax(formData) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  const prompt = `You are an expert Indian tax advisor for FY 2025-26.

Calculate taxes for both old and new regime.

User data:
- Basic Salary: ₹${formData.basicSalary}
- HRA Received: ₹${formData.hra}
- Rent Paid: ₹${formData.rentPaid}
- Other Income: ₹${formData.otherIncome || 0}
- 80C Investments: ₹${Math.min(formData.total80C, 150000)}
- 80D Premium: ₹${Math.min(formData.medicalPremium, 25000)}
- Home Loan Interest: ₹${Math.min(formData.homeLoanInterest, 200000)}
- NPS 80CCD(1B): ₹${Math.min(formData.nps, 50000)}
- Other Deductions: ₹${formData.otherDeductions || 0}

Calculate:
1. HRA exemption (minimum of: actual HRA, rent paid minus 10% of basic, 50% of basic for metro/40% for non-metro)
2. Old regime tax with all deductions applied
3. New regime tax (standard deduction ₹75,000 only, no other deductions)
4. Which regime saves more and by exactly how much
5. List deductions not fully utilized with potential savings

Use FY 2025-26 tax slabs:
OLD REGIME: 0-2.5L=0%, 2.5-5L=5%, 5-10L=20%, above 10L=30%
NEW REGIME: 0-4L=0%, 4-8L=5%, 8-12L=10%, 12-16L=15%, 16-20L=20%, 20-24L=25%, above 24L=30%
Add 4% Health and Education cess on both.
Rebate u/s 87A: Old regime - tax rebate up to ₹12,500 if income <= 5L. New regime - full tax rebate if income <= 12L.

Return ONLY valid JSON, no markdown, no extra text:
{
  "recommendedRegime": "old" or "new",
  "savings": 46800,
  "oldRegime": {
    "grossIncome": 1200000,
    "standardDeduction": 50000,
    "hraExemption": 120000,
    "deduction80C": 150000,
    "deduction80D": 25000,
    "deductionNPS": 50000,
    "homeLoanInterest": 0,
    "otherDeductions": 0,
    "taxableIncome": 805000,
    "taxBeforeCess": 86000,
    "cess": 3440,
    "totalTax": 89440,
    "rebate87A": 0
  },
  "newRegime": {
    "grossIncome": 1200000,
    "standardDeduction": 75000,
    "taxableIncome": 1125000,
    "taxBeforeCess": 112500,
    "cess": 4500,
    "totalTax": 117000,
    "rebate87A": 0
  },
  "missedDeductions": [
    {
      "name": "NPS Additional (80CCD 1B)",
      "currentAmount": 0,
      "maxAmount": 50000,
      "potentialSaving": 15600,
      "action": "Open NPS account and invest ₹50k"
    }
  ],
  "actionPlan": {
    "action1": "Switch to old regime",
    "action1Sub": "Save ₹46,800 this financial year",
    "action2": "Maximize 80C limit",
    "action2Sub": "Save up to ₹12,000 more"
  }
}`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, responseMimeType: 'application/json' }
      })
    }
  )

  const data = await response.json()

  if (!response.ok) throw new Error(data.error?.message || 'Gemini error')

  const text = data.candidates[0].content.parts[0].text
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
