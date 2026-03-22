export async function analyzePortfolio(pdfText) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  const prompt = `You are an expert Indian mutual fund analyst.

Analyze this CAMS statement and return ONLY a valid JSON object with exactly this structure, no extra text, no markdown, no backticks:

{
  "investorName": "Rahul Sharma",
  "totalInvested": 500000,
  "currentValue": 680000,
  "absoluteReturn": 36,
  "xirr": 12.4,
  "xirrVsFD": 7.1,
  "xirrBenchmark": 11.2,
  "xirrComment": "Beating fixed deposits by 5.3% annually",
  "funds": [
    {
      "name": "HDFC Midcap Opportunities Fund",
      "invested": 150000,
      "currentValue": 210000,
      "xirr": 14.2,
      "expenseRatio": 1.54,
      "category": "Mid Cap",
      "planType": "Regular"
    }
  ],
  "overlap": [
    {
      "fund1": "HDFC Midcap Fund",
      "fund2": "Axis Bluechip Fund",
      "overlapPercent": 67,
      "commonStocks": ["Infosys", "HDFC Bank", "Reliance", "TCS"]
    }
  ],
  "expenseDrag": {
    "currentAvgExpenseRatio": 1.5,
    "recommendedExpenseRatio": 0.5,
    "annualFeesCurrently": 8500,
    "annualFeesDirect": 2800,
    "lossOver20Years": 214000,
    "wealthWithCurrentFees": 3200000,
    "wealthWithDirectFees": 3414000
  },
  "overlapScore": 73,
  "diversificationScore": 42,
  "recommendations": [
    {
      "priority": "high",
      "title": "Switch to Direct Plans",
      "detail": "Switching HDFC and Axis funds to Direct plans saves ₹5,700/year in fees",
      "impact": "₹2,14,000 extra wealth in 20 years"
    },
    {
      "priority": "high", 
      "title": "Reduce Fund Overlap",
      "detail": "HDFC Midcap and Axis Bluechip share 67% stocks. Remove one.",
      "impact": "Better true diversification"
    },
    {
      "priority": "medium",
      "title": "Increase SIP Amount",
      "detail": "Adding ₹2,000/month accelerates your goal by 3 years",
      "impact": "Goal achieved in 2031 instead of 2034"
    }
  ]
}

If real CAMS data exists in the text extract it accurately.
If no real data found, generate realistic sample data for a typical Indian investor with 3-4 funds.

CAMS Statement Text:
${pdfText.substring(0, 8000)}`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message || `API Error: ${response.status}`)
  }

  const text = data.candidates[0].content.parts[0].text
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
