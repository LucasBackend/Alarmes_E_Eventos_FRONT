import { Menu } from "antd";
import { LuFactory } from "react-icons/lu";
import { CgSmartHomeBoiler } from "react-icons/cg";
import '../../src/index.css'

const MenuList = () => {
  return (
    <Menu className="mainMenu" theme='dark' mode="inline" style={{ height: "auto", overflow: "auto" }}>
      
      <Menu.SubMenu title="CELULOSE" key="celulose" icon={<LuFactory size={20}/>} >
        <Menu.Item key="patioDeMadeira">
          Alarmes
        </Menu.Item>
        <Menu.Item key="fabDeCelulose">
          Eventos
        </Menu.Item>
        <Menu.Item key="secagem">
          Ocorrências
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu title="UTILIDADES" key="utilidades" icon={<CgSmartHomeBoiler size={20}/>} >
        <Menu.Item key="alarmesUtilidades">
          Alarmes
        </Menu.Item>
        <Menu.Item key="eventosUtilidades">
          Eventos
        </Menu.Item>
        <Menu.Item key="ocorrenciasUtilidades">
          Ocorrências
        </Menu.Item> 
      </Menu.SubMenu>
    </Menu>
  );
}

export default MenuList;