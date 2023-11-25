import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ConfigProvider } from 'antd'
import {AlarmesCelulose} from '../src/pages/AlarmesCelulose/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider>
    <AlarmesCelulose />
  </ConfigProvider>,
)
