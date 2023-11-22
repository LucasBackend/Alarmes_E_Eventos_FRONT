import { MainTable } from './style';
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
  const records = alarmesCelulose;

  const numbers = [...Array(2000).keys()].slice(1)
  const npage = 2000;
  const paginationWindowSize = 5;
  const [paginationWindow, setPaginationWindow] = useState({ start: 1, end: paginationWindowSize });


  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer},
  } = theme.useToken();

  useEffect(()=>{
    async function alarmesCelulose(){

      const body = {"pagination" : currentPage}
      
      const data = await api.post('/alarmes/celulose', body)

      setAlarmesCelulose(data.data)
      console.log(data.data)
      
    }

    alarmesCelulose()
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

            <div className='mainPageTable'>
              <MainTable>
                <table className="table minha-classe-personalizada">
                  <thead>
                    <tr>
                      <th>Início</th>
                      <th>Fim</th>
                      <th>TAG</th>
                      <th>Tipo</th>
                      <th>Alarme</th>
                      <th>Reconhecimento</th>
                      <th>Área</th>
                    </tr>
                  </thead>

                  <tbody>
                    { records.map ((d,i) => (
                      <tr key={i}>
                        <td>{d.alci_dt_alarme === null ? '-' : d.alci_dt_alarme.value.toLocaleDateString('en-GB')}</td>
                        <td>{d.alci_dt_final===null?'-':d.alci_dt_final.value}</td>
                        <td>{d.alci_ds_tag}</td>
                        <td>{d.alci_ds_tipo_alarme_1}</td>
                        <td>{d.alci_tx_usuario_1}</td>
                        <td>{d.alci_dt_reconhecimento===null?'-':d.alci_dt_reconhecimento.value}</td>
                        <td>{d.alci_ds_area}</td>
                        {/* <td>{d.alci_cd_identificador}</td> */}
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
            </div>

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
  
}


