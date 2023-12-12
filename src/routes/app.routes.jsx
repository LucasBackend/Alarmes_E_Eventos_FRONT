import { Route, Routes } from 'react-router-dom'
 
import { AlarmesCelulose } from '../pages/AlarmesCelulose'
import { AlarmesUtilidades } from '../pages/AlarmesUtilidades'
import { EventosCelulose } from '../pages/EventosCelulose'
import { EventosUtilidades } from '../pages/EventosUtilidades'
 
export function AppRoutes() {
  return (
<Routes>
<Route path="/" element={<AlarmesCelulose />} />
<Route path="/alarmes/utilidades" element={<AlarmesUtilidades />} />
<Route path="/eventos/celulose" element={<EventosCelulose />} />
<Route path="/eventos/utilidades" element={<EventosUtilidades />} />
</Routes>
  )
}