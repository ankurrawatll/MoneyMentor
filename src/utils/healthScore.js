export function calculateHealthScore(data) {
  let score = 100

  // XIRR scoring (max 30 points)
  if (data.xirr >= 14) score -= 0
  else if (data.xirr >= 12) score -= 5
  else if (data.xirr >= 10) score -= 10
  else if (data.xirr >= 8) score -= 20
  else score -= 30

  // Overlap penalty (max 25 points)
  if (data.overlapScore >= 70) score -= 25
  else if (data.overlapScore >= 50) score -= 15
  else if (data.overlapScore >= 30) score -= 8
  else score -= 0

  // Expense ratio penalty (max 25 points)  
  if (data.expenseDrag.currentAvgExpenseRatio >= 2.0) score -= 25
  else if (data.expenseDrag.currentAvgExpenseRatio >= 1.5) score -= 15
  else if (data.expenseDrag.currentAvgExpenseRatio >= 1.0) score -= 8
  else score -= 0

  // Diversification (max 20 points)
  const fundCount = data.funds?.length || 0
  if (fundCount < 2) score -= 20
  else if (fundCount > 6) score -= 10
  else score -= 0

  return Math.max(0, Math.min(100, score))
}
