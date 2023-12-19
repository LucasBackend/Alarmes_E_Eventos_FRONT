import {Menu } from "antd";
import React from "react";
import { CgSmartHomeBoiler } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi2";
import { LuFactory } from "react-icons/lu";
import { Link } from "react-router-dom";
import '../../src/index.css';
import { GiProcessor } from "react-icons/gi";
import { PiComputerTower } from "react-icons/pi";

const MenuList = ({colapse}) => {
  const renderLink = (label, to) => (
    <Link to = {to}>
      {label}
    </Link>
  )

  const home = ()=>{
    return <button style={{background:"transparent",color:"white",width:"100%",textAlign:"left"}} onClick={navigate}>HOME</button>
  }

  const section = (session)=>{
    return <span style={{color:"#c7c7c7"}}>{session}</span>
  }

  const iconcolapse = (Icone)=>{
    return <Icone size={20} />
  }

  function navigate(){
    window.location.href = "https://apps.powerapps.com/play/e/default-a7109315-9727-4adf-97ad-4849bb63edcb/a/c1a97402-4d2d-4397-a1a7-ae41801b791b?tenantId=a7109315-9727-4adf-97ad-4849bb63edcb&source=portal&screenColor=rgba(42%2C%2048%2C%2066%2C%201)&hidenavbar=true"
  }

  return (
    <Menu 
      className="mainMenu" 
      theme='dark' 
      mode="inline" 
      id="MenuList"
      style={{ height: "auto", overflow: "auto" }} 
      defaultOpenKeys={['celulose','utilidades']}
      items={[
        {
          label: home(),
          key: 'HOME',
          icon: <HiOutlineHome size={20} stroke="white"/>,
                    
        },
        {
          label: 'PROCESSO',
          key: 'PROCESSO',
          icon: colapse?iconcolapse(GiProcessor):null
          
        },
        {
          label: "CELULOSE",
          key: 'celulose',
          icon: <LuFactory size={20} />,
          children: [
            { label: renderLink('Alarmes', '/'), key: 'alarmesCelulose' },
            { label: renderLink('Eventos', '/eventos/celulose'), key: 'eventosCelulose' },
            
          ],
        },
        {
          label: 'UTILIDADES',
          key: 'utilidades',
          icon: <CgSmartHomeBoiler size={20} />,
          children: [
            { label: renderLink('Alarmes', '/alarmes/utilidades'), key: 'alarmesUtilidades' },
            { label: renderLink('Eventos', '/eventos/utilidades'), key: 'eventosUtilidades' },
            
          ],

        },
        {
          label:section('SISTEMA'),
          key: 'SISTEMA',
          icon: colapse?iconcolapse(PiComputerTower):null
        }
      ]}
    />
  );
}

export default MenuList;