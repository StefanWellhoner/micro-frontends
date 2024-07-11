import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'
import UsageBar from './components/UsageBar/UsageBar'
import InstanceTable from './components/InstanceTable/InstanceTable'

const App = () => (
  <div className="mt-5 mx-auto max-w-6xl">
    <div>Name: instanceusage-fe</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
    <UsageBar />
    <InstanceTable />
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
