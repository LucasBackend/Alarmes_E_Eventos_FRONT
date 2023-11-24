import { MainTable,HeaderTable } from './style';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Button, Layout, theme } from 'antd';
import { PiTargetThin } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
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

  const numbers = [...Array(2000).keys()].slice(1)
  const npage = 2000;
  const paginationWindowSize = 5;
  const [paginationWindow, setPaginationWindow] = useState({ start: 1, end: paginationWindowSize });
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [collapsed, setCollapsed] = useState(false);
  const [linhasSelecionadas,setLinhasSelecionadas] = useState([])

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
            
              <MainTable>
              <HeaderTable>
                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </HeaderTable>
                {alarmesCelulose.length>0&&
                <div id="scrollTable">
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
                    {alarmesCelulose.slice((currentPage*itemsPerPage)-itemsPerPage, currentPage * itemsPerPage).map ((d,i) => (
                      
                      <tr key={i} data-select={linhasSelecionadas.includes(i)}>
                        <td>{d.alci_ds_tag}</td>
                        <td>{d.alci_tx_usuario_2}</td>
                        <td>{d.alci_ds_tipo_alarme_1}</td>
                        <td>{d.alci_tx_usuario_1}</td>
                        <td>{d.alci_dt_alarme === null ? '-' : dateFormat(d.alci_dt_alarme.value)}</td>
                        <td>{d.alci_dt_final===null?'-':`teste`}</td>
                        <td>
                          <Button onClick={()=>{selectTableHandleClick(i)}}>
                            {linhasSelecionadas.includes(i)?<AiOutlineClose/>:<PiTargetThin  size={15}/>}
                          </Button>
                        </td>
                      </tr>
                    ))}
                    
                  </tbody>
                </table>
                </div>
                }
               
                {alarmesCelulose.length>0&&
                <nav>
                  <ul className='pagination'>
                    <li className='page-item'>
                      <a href='#' className='page-link' 
                      onClick={prevPage}>Anterior</a>
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
                      onClick={nextPage}>Próximo</a>
                    </li>

                  </ul>
                </nav>
                }
                
              </MainTable>
              

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
    const dia = dataCorrigida.getDate();
    const mes = dataCorrigida.getMonth() + 1; 
    const ano = dataCorrigida.getFullYear();

    const dataFormatada = `${dia<10?`${0}${dia}`:dia}/${mes<10?`${0}${mes}`:mes}/${ano}`;

    return dataFormatada;
  }

  function selectTableHandleClick(key){
    if(linhasSelecionadas.includes(key)){
      setLinhasSelecionadas([...linhasSelecionadas.filter(item=>item!==key)])
      console.log(linhasSelecionadas)
    }else{
      setLinhasSelecionadas([...linhasSelecionadas,key])
      console.log(linhasSelecionadas)
    }
  }
}


