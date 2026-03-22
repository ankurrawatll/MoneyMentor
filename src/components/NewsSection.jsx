import { useState, useEffect } from 'react'

export default function NewsSection({ data }) {
  const [news, setNews] = useState([])

  useEffect(() => {
    async function fetchFundNews() {
      const fallback = [
        {
          title: "SEBI makes direct mutual fund plans more accessible for retail investors",
          source: { name: "ET Markets" },
          publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
          url: "https://economictimes.com"
        },
        {
          title: "Expense ratios on regular plans cost investors ₹12,000 crore annually: AMFI data", 
          source: { name: "Business Standard" },
          publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
          url: "https://economictimes.com"
        },
        {
          title: "Mid and small cap funds outperform large caps over 5-year horizon: Report",
          source: { name: "Mint" },
          publishedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
          url: "https://economictimes.com"
        }
      ]

      try {
        const apiKey = import.meta.env.VITE_GNEWS_API_KEY
        if (!apiKey) {
           setNews(fallback)
           return
        }
        
        const fundName = data.funds[0]?.name?.split(' ').slice(0, 3).join(' ') || 'mutual fund India'
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(fundName + ' mutual fund')}&lang=en&country=in&max=3&apikey=${apiKey}`
        
        const res = await fetch(url)
        const json = await res.json()
        if (json.articles && json.articles.length > 0) {
          setNews(json.articles.slice(0, 3))
        } else {
          setNews(fallback)
        }
      } catch (e) {
        setNews(fallback)
      }
    }
    fetchFundNews()
  }, [data])

  if (news.length === 0) return null

  const getTimeAgo = (dateStr) => {
    if (dateStr.includes('ago')) return dateStr.split('ago')[0] + 'ago'
    const diff = Date.now() - new Date(dateStr).getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 24) return `${hours} hours ago`
    return `${Math.floor(hours / 24)} days ago`
  }

  return (
    <div className="w-full my-10 md:my-14 overflow-hidden">
      <h3 className="text-et-red text-[11px] font-bold tracking-[0.1em] mb-4 uppercase">RELATED NEWS</h3>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {news.map((item, idx) => (
          <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="flex-1 w-full bg-white border border-[#E5E5E5] p-4 hover:border-et-red transition-colors duration-200 flex flex-col cursor-pointer no-underline">
            <span className="text-et-red text-[11px] font-bold uppercase mb-2 line-clamp-1">{item.source?.name || item.source}</span>
            <h4 className="text-[#111111] text-[13px] font-bold leading-snug mb-3 line-clamp-2">{item.title}</h4>
            <span className="mt-auto text-[#999999] text-[11px] font-medium">{item.time || getTimeAgo(item.publishedAt)}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
