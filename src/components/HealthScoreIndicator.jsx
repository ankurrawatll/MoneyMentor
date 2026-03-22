import { calculateHealthScore } from '../utils/healthScore'

export default function HealthScoreIndicator({ data }) {
  const score = calculateHealthScore(data)
  
  const strokeColor = score > 70 ? '#16A34A' : score >= 50 ? '#D97706' : '#E8002D'
  const textLabel = score > 70 ? 'Good portfolio' : score >= 50 ? 'Needs attention' : 'Take action now'
  
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center my-6 md:my-10 mx-auto w-full max-w-sm">
      <div className="relative w-[120px] h-[120px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle className="text-[#E5E5E5] stroke-current" strokeWidth="8" cx="60" cy="60" r={radius} fill="transparent" />
          <circle 
            className="stroke-current transition-all duration-1000 ease-out" 
            style={{ strokeDasharray: circumference, strokeDashoffset, color: strokeColor }}
            strokeWidth="8" strokeLinecap="round" cx="60" cy="60" r={radius} fill="transparent" 
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[32px] font-black text-et-black stat-number leading-none">{score}</span>
        </div>
      </div>
      <p className="mt-4 font-bold text-[14px] uppercase tracking-wide" style={{ color: strokeColor }}>{textLabel}</p>
    </div>
  )
}
