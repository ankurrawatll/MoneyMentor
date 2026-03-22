import { useState, useRef, useEffect } from 'react'
import '../index.css'

export default function UploadScreen({ activeTab, setActiveTab, onFileUpload, onStartTaxWizard }) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 768

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    setError('')
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a valid PDF file.')
        return
      }
      onFileUpload(file)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setError('')
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a valid PDF file.')
        return
      }
      onFileUpload(file)
    }
  }

  const newsItems = [
    "📊 New tax regime now default for salaried employees — CBDT",
    "💰 Section 80C limit unchanged at ₹1.5L for FY 2025-26",  
    "🏠 HRA exemption: Metro cities get 50% basic salary benefit",
    "📈 NPS subscribers get additional ₹50,000 deduction under 80CCD",
    "⚠️ Deadline: File ITR before July 31, 2026 to avoid ₹5,000 penalty",
    "✅ Standard deduction hiked to ₹75,000 under new regime",
    "🔄 Switching regime? You can change every year while filing ITR",
    "💡 ELSS funds qualify for 80C — invest before March 31, 2026"
  ]

  return (
    <div className="w-full bg-white relative">
      {activeTab === 'portfolio' ? (
        <div key="portfolio" className="tab-content relative flex flex-col justify-between" style={{ 
          minHeight: 'calc(100vh - 120px)',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.73) 0%, rgba(255,255,255,0.80) 70%, #FFFFFF 100%), url("https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}>
          
          <div className="w-full max-w-[1200px] mx-auto px-5 pt-12 pb-24 md:pt-20 md:pb-40 lg:pt-24 lg:pb-56 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-20 relative z-10 w-full" style={{ flex: 1 }}>
            
            {/* LEFT TEXT BOX */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
              <div style={{
                fontSize:'11px',
                fontWeight:500,
                color:'#E8002D',
                letterSpacing:'0.1em',
                textTransform:'uppercase',
                marginBottom:'16px'
              }}>MF Portfolio X-Ray</div>
              
              <h1 style={{
                fontSize: isMobile ? '40px' : 'clamp(40px, 5vw, 68px)',
                fontWeight:900,
                lineHeight:1.05,
                letterSpacing:'-0.03em',
                color:'#111111',
                margin:0
              }}>
                Know what your<br/>
                mutual funds<br/>
                <span style={{color:'#E8002D', fontStyle:'italic'}}>
                  are REALLY
                </span><br/>
                doing.
              </h1>
              
              <p style={{
                fontSize:'16px',
                color:'#555555',
                marginTop:'24px',
                lineHeight:1.6,
                maxWidth:'440px'
              }}>
                Most Indians don't know their real returns, 
                hidden fees, or that their 5 'different' funds 
                own the same 30 stocks.
              </p>
              
              <div style={{
                display:'flex',
                gap:'8px',
                marginTop:'32px',
                marginBottom: isMobile ? '12px' : '0',
                flexWrap:'wrap',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}>
                {['₹14L+ crore in MFs','Avg overlap: 61%',
                  'Fees cost ₹2L+ over 20 yrs'].map(t => (
                  <span key={t} style={{
                    background:'#111111',
                    color:'#FFFFFF',
                    padding:'8px 16px',
                    fontSize:'12px',
                    fontWeight:500
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* RIGHT UPLOAD CARD */}
            <div className="w-full md:max-w-[480px] shrink-0" style={{
              background: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              padding: isMobile ? '24px' : '32px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', textAlign: 'center' }}>Upload your CAMS statement</h2>
              <p style={{ color: '#888', fontSize: '13px', textAlign: 'center', margin: '0 0 20px 0' }}>Free • Private • 10 second analysis</p>
              
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: isDragging ? '2px dashed #E8002D' : '2px dashed #E5E5E5',
                  borderRadius:'4px',
                  padding:'32px 24px',
                  textAlign:'center',
                  cursor:'pointer',
                  background: isDragging ? '#FFF5F5' : '#F8F8F8',
                  transition:'all 0.2s'
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleChange}
                  style={{display:'none'}}
                />
                <div style={{ fontSize:'32px', color: isDragging ? '#E8002D' : '#999', marginBottom:'12px', transition: 'color 0.2s', lineHeight: 1 }}>↑</div>
                <div style={{ fontSize:'15px', fontWeight:600, color:'#111111' }}>Drag your CAMS statement here</div>
                <div style={{ fontSize:'14px', color:'#999999', marginTop:'4px' }}>or click to browse files</div>
              </div>
              
              {error && <div style={{ color:'#E8002D', fontSize:'13px', marginTop:'12px', textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}
              
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'20px', flexWrap: 'wrap', gap: '12px' }}>
                <a 
                  href="https://www.camsonline.com/Investors/Statements/Consolidated-Account-Statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color:'#E8002D', fontSize:'13px', textDecoration:'none', fontWeight: 'bold' }}
                >How to download CAMS statement →</a>
                <span style={{ fontSize:'12px', color:'#999999' }}>🔒 Processed locally</span>
              </div>
            </div>
          </div>
          
          {/* STATS BAR */}
          <div style={{
            background:'#111111',
            minHeight:'56px',
            display:'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems:'center',
            justifyContent:'space-around',
            borderTop:'2px solid #E8002D',
            padding: isMobile ? '16px' : '0',
            gap: isMobile ? '16px' : '0'
          }}>
            {[
              {num:'₹14L+ Cr', label:'in Indian MFs'},
              {num:'61%', label:'avg fund overlap'},
              {num:'₹2.1L', label:'lost to fees/20yr'}
            ].map(s => (
              <div key={s.num} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'16px', fontWeight:900, color:'#FFFFFF' }}>{s.num}</div>
                <div style={{ fontSize:'11px', color:'#888888' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div key="tax" className="tab-content relative w-full flex flex-col overflow-x-hidden">
          {/* SECTION A: HERO */}
          <div style={{ 
            position: 'relative',
            width: '100%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.73) 0%, rgba(255,255,255,0.80) 70%, #FFFFFF 100%), url("https://images.pexels.com/photos/6120211/pexels-photo-6120211.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}>
            <div style={{ padding: isMobile ? '40px 20px 64px' : '100px 40px 80px', maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '64px', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <div style={{ width: isMobile ? '100%' : '60%' }}>
              <div style={{ fontSize:'11px', fontWeight:700, color:'#E8002D', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'20px' }}>TAX WIZARD • FY 2025-26</div>
              <h1 style={{ fontSize: isMobile ? '40px' : 'clamp(48px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#111', margin: '0 0 20px 0' }}>
                Are you on the<br/>wrong tax<br/>regime?
              </h1>
              <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.5, maxWidth: '480px', marginBottom: '32px' }}>
                73% of salaried Indians are losing money by choosing the wrong tax regime. Find out in 2 minutes.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                <div style={{ display: 'inline-block', background: '#F8F8F8', padding: '10px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, color: '#333', border: '1px solid #E5E5E5', width: 'fit-content' }}>
                  Avg Indian overpays ₹31,200/year in tax
                </div>
                <div style={{ display: 'inline-block', background: '#F8F8F8', padding: '10px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: 600, color: '#333', border: '1px solid #E5E5E5', width: 'fit-content' }}>
                  New regime suits 60% of taxpayers
                </div>
              </div>
              <button 
                onClick={onStartTaxWizard}
                style={{ background: '#E8002D', color: '#FFF', width: isMobile ? '100%' : '280px', height: '56px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 14px rgba(232,0,45,0.3)' }}
              >
                Calculate My Tax Savings →
              </button>
            </div>

            <div style={{ width: isMobile ? '100%' : '40%' }}>
              <div style={{ background: '#FFF', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '24px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>Quick comparison</div>
                
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>₹12L salary, max 80C</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: '#555' }}>OLD REGIME:</span>
                    <span style={{ color: '#E8002D', fontWeight: 700 }}>₹89,440 tax</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span style={{ color: '#555' }}>NEW REGIME:</span>
                    <span style={{ color: '#999', fontWeight: 600 }}>₹1,17,000 tax</span>
                  </div>
                  <div style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>OLD REGIME WINS</div>
                </div>

                <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '24px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>₹8L salary, no deductions</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: '#555' }}>OLD REGIME:</span>
                    <span style={{ color: '#999', fontWeight: 600 }}>₹75,400 tax</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span style={{ color: '#555' }}>NEW REGIME:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#E8002D', textDecoration: 'line-through', fontSize: '12px' }}>₹46,800</span>
                      <span style={{ color: '#16A34A', fontWeight: 700 }}>₹0 tax</span>
                    </div>
                  </div>
                  <div style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>NEW REGIME WINS</div>
                </div>

                <div style={{ fontSize: '12px', color: '#999', fontStyle: 'italic', textAlign: 'center' }}>Your result depends on your specific deductions</div>
              </div>
            </div>
          </div>
          </div>

          {/* SECTION B: LIVE NEWS TICKER */}
          <div style={{ background: '#111', width: '100%', height: isMobile ? 'auto' : '44px', display: 'flex', alignItems: 'center', padding: isMobile ? '12px 16px' : '0 24px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '24px', borderRight: '1px solid #333', zIndex: 10, background: '#111' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E8002D', animation: 'pulse 1.5s infinite' }}></div>
              <span style={{ color: '#FFF', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>LIVE</span>
              <span style={{ color: '#999', fontSize: '11px', marginLeft: '4px', whiteSpace: 'nowrap' }}>TAX & FINANCE NEWS</span>
            </div>
            
            <div style={{ flex: 1, overflow: 'hidden', paddingLeft: '24px' }}>
               <div className="hover:!animation-play-state-paused" style={{ display: 'flex', width: 'fit-content', animation: 'ticker 40s linear infinite' }}>
                  {[...newsItems, ...newsItems].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                      <span style={{ color: '#FFF', fontSize: isMobile ? '12px' : '13px', letterSpacing: '0.02em', fontWeight: 500 }}>{item}</span>
                      <span style={{ color: '#E8002D', margin: '0 48px' }}>•</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* SECTION C: HOW IT WORKS */}
          <div style={{ background: '#FFF', padding: isMobile ? '64px 20px' : '80px 40px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111', marginBottom: '48px' }}>How Tax Wizard works</h2>
            
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '32px' : '40px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#E8002D', lineHeight: 1, marginBottom: '16px' }}>01</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '12px' }}>Enter your income</h3>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>Basic salary, HRA, and any other income sources. Takes 30 seconds.</p>
                {isMobile ? 
                  <div style={{ height: '1px', background: '#E5E5E5', width: '100%', marginTop: '32px' }}></div> : 
                  <div style={{ position: 'absolute', right: '-20px', top: '20px', bottom: '20px', width: '1px', background: '#E5E5E5' }}></div>
                }
              </div>
              
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#E8002D', lineHeight: 1, marginBottom: '16px' }}>02</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '12px' }}>Add your deductions</h3>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>80C investments, insurance premiums, home loan — we find everything you qualify for.</p>
                {isMobile ? 
                  <div style={{ height: '1px', background: '#E5E5E5', width: '100%', marginTop: '32px' }}></div> : 
                  <div style={{ position: 'absolute', right: '-20px', top: '20px', bottom: '20px', width: '1px', background: '#E5E5E5' }}></div>
                }
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#E8002D', lineHeight: 1, marginBottom: '16px' }}>03</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '12px' }}>Get your verdict</h3>
                <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.6 }}>Exact tax under both regimes, your recommended regime, and how much you save.</p>
              </div>
            </div>
          </div>

          {/* SECTION D: BOTTOM CTA */}
          <div style={{ background: '#111', padding: isMobile ? '64px 20px' : '80px 40px', textAlign: 'center', width: '100%' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#FFF', marginBottom: '16px' }}>Stop overpaying tax.</h2>
            <p style={{ fontSize: '15px', color: '#999', marginBottom: '40px' }}>Takes 2 minutes. No signup. No data stored.</p>
            
            <button 
              onClick={onStartTaxWizard}
              style={{ background: '#E8002D', color: '#FFF', width: isMobile ? '100%' : '320px', height: '60px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background 0.2s', marginBottom: '24px' }}
            >
              Start Tax Wizard →
            </button>
            
            <div>
              <button 
                onClick={() => setActiveTab('portfolio')}
                style={{ background: 'transparent', border: 'none', color: '#999', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Already know your regime? Check your portfolio instead →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
