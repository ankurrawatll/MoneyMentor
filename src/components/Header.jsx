export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-et-border min-h-[48px] md:h-14 flex flex-wrap md:flex-nowrap items-center justify-between px-4 md:px-8 py-2 md:py-0 gap-2 md:gap-4 overflow-hidden">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-et-red text-white font-bold p-1 leading-none text-sm md:text-base hidden sm:block">
          MF
        </div>
        <div className="bg-et-red text-white font-bold p-1 leading-none text-[10px] sm:hidden">
          MF
        </div>
        <h1 className="font-bold text-et-black text-sm md:text-lg whitespace-nowrap">Portfolio X-Ray</h1>
      </div>

      {/* Tab Switcher */}
      {activeTab && setActiveTab && (
        <div className="flex-1 flex justify-center order-3 md:order-2 w-full md:w-auto mt-2 md:mt-0">
          <div style={{
            display: 'flex',
            border: '1px solid #E5E5E5',
            borderRadius: '6px',
            overflow: 'hidden',
            height: '32px',
            width: '100%',
            maxWidth: '320px'
          }}>
            <button
              onClick={() => setActiveTab('portfolio')}
              style={{
                flex: 1,
                fontSize: '13px',
                fontWeight: activeTab === 'portfolio' ? 700 : 400,
                background: activeTab === 'portfolio' ? '#111111' : '#FFFFFF',
                color: activeTab === 'portfolio' ? '#FFFFFF' : '#555555',
                border: 'none',
                cursor: 'pointer',
                borderRight: '1px solid #E5E5E5'
              }}
            >Portfolio X-Ray</button>
            <button
              onClick={() => setActiveTab('tax')}
              style={{
                flex: 1,
                fontSize: '13px',
                fontWeight: activeTab === 'tax' ? 700 : 400,
                background: activeTab === 'tax' ? '#111111' : '#FFFFFF',
                color: activeTab === 'tax' ? '#FFFFFF' : '#555555',
                border: 'none',
                cursor: 'pointer'
              }}
            >Tax Wizard</button>
          </div>
        </div>
      )}

      {/* Credits */}
      <div className="text-et-muted text-[10px] md:text-xs order-2 md:order-3 md:min-w-[140px] text-right">
        Built by Ankur Rawat for ET
      </div>
    </header>
  )
}
