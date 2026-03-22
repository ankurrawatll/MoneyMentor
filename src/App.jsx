import { useState } from 'react'
import Header from './components/Header'
import UploadScreen from './components/UploadScreen'
import LoadingScreen from './components/LoadingScreen'
import Dashboard from './components/Dashboard'
import TaxWizardScreen from './components/TaxWizardScreen'
import TaxResultsDashboard from './components/TaxResultsDashboard'
import { extractTextFromPDF } from './utils/pdfParser'
import { analyzePortfolio } from './utils/geminiClient'

function App() {
  const [screen, setScreen] = useState('upload')
  const [activeTab, setActiveTab] = useState('portfolio')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  
  const [taxData, setTaxData] = useState(null)
  const [taxFormData, setTaxFormData] = useState(null)

  const handleFileUpload = async (file) => {
    try {
      setError('')
      setScreen('loading')
      
      const text = await extractTextFromPDF(file)
      
      if (!text || text.trim().length < 100) {
        throw new Error('Could not extract sufficient text from the PDF. Please ensure it is a valid CAMS statement.')
      }
      
      const resultData = await analyzePortfolio(text)
      
      setData(resultData)
      setScreen('dashboard')
    } catch (err) {
      console.error('Analysis failed:', err)
      setError(err.message || 'An error occurred during analysis')
      setScreen('upload')
    }
  }

  return (
    <>
      <Header activeTab={screen === 'upload' ? activeTab : null} setActiveTab={setActiveTab} />
      
      {screen === 'upload' && (
        <UploadScreen 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onFileUpload={handleFileUpload} 
          onStartTaxWizard={() => setScreen('tax-wizard')} 
        />
      )}
      
      {screen === 'loading' && <LoadingScreen />}
      
      {screen === 'dashboard' && (
        <Dashboard 
          data={data} 
          onTaxWizardClick={() => setScreen('tax-wizard')}
        />
      )}
      
      {screen === 'tax-wizard' && (
        <TaxWizardScreen 
          onBack={() => setScreen('upload')}
          onComplete={(formData, results) => {
            setTaxFormData(formData)
            setTaxData(results)
            setScreen('tax-results')
          }}
        />
      )}
      
      {screen === 'tax-results' && (
        <TaxResultsDashboard 
          data={taxData}
          formData={taxFormData}
          onBack={() => setScreen('tax-wizard')}
          onGoToPortfolio={() => setScreen('upload')}
        />
      )}
    </>
  )
}

export default App
