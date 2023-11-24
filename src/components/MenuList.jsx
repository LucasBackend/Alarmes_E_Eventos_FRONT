import { Menu } from "antd";
import { LuFactory } from "react-icons/lu";
import { CgSmartHomeBoiler } from "react-icons/cg";
import '../../src/index.css'

const MenuList = () => {
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
            { label: 'Alarmes', key: 'patioDeMadeira' },
            { label: 'Eventos', key: 'fabDeCelulose' },
            { label: 'Ocorrências', key: 'secagem' },
          ],
        },
        {
          label: 'UTILIDADES',
          key: 'utilidades',
          icon: <CgSmartHomeBoiler size={20} />,
          children: [
            { label: 'Alarmes', key: 'alarmesUtilidades' },
            { label: 'Eventos', key: 'eventosUtilidades' },
            { label: 'Ocorrências', key: 'ocorrenciasUtilidades' },
          ],
        },
      ]}
    />
  );
}

export default MenuList;