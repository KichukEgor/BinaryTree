import React from 'react'
import { options } from './tree-lib/config'
import { TreeGraph } from './components/TreeGraph'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return <TreeGraph options={options} />
}

export default App
