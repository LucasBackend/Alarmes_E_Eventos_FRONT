import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { LuFactory } from "react-icons/lu";
import { CgSmartHomeBoiler } from "react-icons/cg";
import '../../src/index.css'

const MenuList = () => {
  const renderLink = (label, to) => (
    <Link to = {to}>
      {label}
    </Link>
  )

  return (
    <Menu 
      className="mainMenu" 
      theme='dark' 
      mode="inline" 
      style={{ height: "auto", overflow: "auto" }} 
      items={[
        {
          label: 'CELULOSE',
          key: 'celulose',
          icon: <LuFactory size={20} />,
          children: [
            { label: renderLink('Alarmes', '/'), key: 'alarmesCelulose' },
            { label: renderLink('Eventos', '/eventos/celulose'), key: 'eventosCelulose' },
            { label: 'Ocorrências', key: 'secagem' },
          ],
        },
        {
          label: 'UTILIDADES',
          key: 'utilidades',
          icon: <CgSmartHomeBoiler size={20} />,
          children: [
            { label: renderLink('Alarmes', '/alarmes/utilidades'), key: 'alarmesUtilidades' },
            { label: renderLink('Eventos', '/eventos/utilidades'), key: 'eventosUtilidades' },
            { label: 'Ocorrências', key: 'ocorrenciasUtilidades' },
          ],
        },
      ]}
    />
  );
}

export default MenuList;