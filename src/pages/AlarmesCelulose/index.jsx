import { MainTable } from './style';
import { FaRegHandPointUp } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Button, Layout, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from '../../components/Logo';
import MenuList from '../../components/MenuList';
import logoCompleta from '../../assets/logocompleta.png'
import '../../../src/index.css';
import api from '../../service/api'
import { ConfigProvider } from 'antd';

const { Header, Sider } = Layout;

export function AlarmesCelulose() {


  const [alarmesCelulose, setAlarmesCelulose] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // const lastIndex = currentPage + 5;
  // const firstIndex = lastIndex - recordsPerPage;
  //const records = alarmesCelulose;

  const numbers = [...Array(2000).keys()].slice(1)
  const npage = 2000;
  const paginationWindowSize = 5;
  const [paginationWindow, setPaginationWindow] = useState({ start: 1, end: paginationWindowSize });


  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer},
  } = theme.useToken();

  useEffect(()=>{
    async function alarmesCeluloseArray(){

       if (currentPage === 1 && alarmesCelulose.length === 0) {
        let body = {"pagination" : currentPage}
         
        const data = await api.post('/alarmes/celulose', body)
  
        setAlarmesCelulose(data.data)
      }else{
        if((currentPage * 20)>alarmesCelulose.length){
        let body = {"pagination" : currentPage}
         
        const data = await api.post('/alarmes/celulose', body)
          
        
  
        setAlarmesCelulose([...alarmesCelulose,...data.data])
        
      }else{
        return
      }
    } 
    }

    alarmesCeluloseArray()
  },[currentPage])

  return (
    
    <ConfigProvider>
      <Layout>
          <Sider collapsed={collapsed} collapsible trigger={null} className="sidebar" width={260} style={{paddingLeft: '10px', height:'100vh', background: 'var(--sami-main)', overflowY: "auto"}}>
            {collapsed?<Logo />:<img src={logoCompleta} width={100} className='LogoCompleta'/>}
            <MenuList style={{height: 'auto'}} />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer}} >
              
              <Button 
                type='text' 
                className='toggle'
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : 
                <MenuFoldOutlined />} 
              />
              
              
            </Header>
            {alarmesCelulose.length>0&&
            
              <MainTable>
                <table className="table minha-classe-personalizada">
                  <thead>
                    <tr>
                      <th>TAG</th>
                      <th>Descrição</th>
                      <th>Tipo</th>
                      <th>Alarme</th>
                      <th>Data</th>
                      <th>Hora</th>
                      <th>  </th>
                    </tr>
                  </thead>

                  <tbody>
                    { alarmesCelulose.slice((currentPage*20)-20, currentPage*20).map ((d,i) => (
                      
                      <tr key={i}>
                        <td>{d.alci_ds_tag}</td>
                        <td>{d.alci_tx_usuario_2}</td>
                        <td>{d.alci_ds_tipo_alarme_1}</td>
                        <td>{d.alci_tx_usuario_1}</td>
                        <td>{d.alci_dt_alarme === null ? '-' : dateFormat(d.alci_dt_alarme.value)}</td>
                        <td>{d.alci_dt_final===null?'-':`teste`}</td>
                        <td>
                          <Button>
                            <FaRegHandPointUp size={15}/>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav>
                  <ul className='pagination'>
                    <li className='page-item'>
                      <a href='#' className='page-link' 
                      onClick={prevPage}>Prev</a>
                    </li>
                    {
                      numbers.slice(paginationWindow.start - 1, paginationWindow.end)
                      .map((n, i) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ' '}`} key={i}>
                          <a href='#' className='page-link' 
                          onClick={() => changeCPage(n)} >{n}</a>
                        </li>
                      ))
                    }
                    <li className='page-item'>
                      <a href='#' className='page-link' 
                      onClick={nextPage}>Next</a>
                    </li>

                  </ul>
                </nav>
              </MainTable>
            
}
          </Layout>

          
      </Layout>
    </ConfigProvider>
                
  )

  function prevPage() {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (newPage < paginationWindow.start) {
        const newStart = Math.max(newPage - 2, 1);
        setPaginationWindow({ start: newStart, end: newStart + paginationWindowSize - 1 });
      }
    }
  }

  function changeCPage(pageNumber) {
    setCurrentPage(pageNumber);
  
    if (pageNumber >= paginationWindow.start + paginationWindowSize - 1) {
      const newEnd = Math.min(pageNumber + 2, npage);
      setPaginationWindow({ start: newEnd - paginationWindowSize + 1, end: newEnd });
    }
    else if (pageNumber === paginationWindow.start && pageNumber > 1) {
      const newStart = Math.max(pageNumber - 2, 1);
      setPaginationWindow({ start: newStart, end: newStart + paginationWindowSize - 1 });
    }
  }
  
  function nextPage() {
    if(currentPage < npage){
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (newPage > paginationWindow.end) {
        const newStart = Math.min(newPage - 2, npage - paginationWindowSize + 1);
        setPaginationWindow({ start: newStart, end: newStart + paginationWindowSize - 1 });
      }
    }
  }

  function dateFormat(date){
    const data = new Date(date);
    const offset = data.getTimezoneOffset(); // Diferença em minutos entre UTC e o fuso horário local
    const dataCorrigida = new Date(data.getTime() - (offset * -60000)); // Ajusta para UTC
    const dateBR = dataCorrigida.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false });
  
    return dateBR;
  }
}


