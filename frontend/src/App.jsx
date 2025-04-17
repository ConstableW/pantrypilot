import { useTranslation } from 'react-i18next'

function App() {
  const { t, i18n } = useTranslation()
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <button onClick={() => i18n.changeLanguage('de')} className="mr-2">DE</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </div>
  )
}
export default App
