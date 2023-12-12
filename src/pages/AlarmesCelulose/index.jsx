import { MainTable,HeaderTable } from './style';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react';
import { Button, Layout, theme } from 'antd';
import { PiTargetThin } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Logo from '../../components/Logo';
import MenuList from '../../components/MenuList';
import logoCompleta from '../../assets/logocompleta.png'
import '../../../src/index.css';
import api from '../../service/api'
import ExportToExcel from './excel.jsx'



const { Header, Sider } = Layout; 

export function AlarmesCelulose() {
  const scrollContainerRef = useRef(null);

  const [alarmesCelulose, setAlarmesCelulose] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filtroDataInicio,setFiltroDataInicio] = useState()
  const [filtroDataFim,setFiltroDataFim] = useState()
  const [filtroArea,setFiltroArea] = useState('')

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

  function date(){
    const data = new Date()
    const anoatual = data.getFullYear()
    const mesAtual = data.getMonth()+1
    const diaAtual = data.getDate() 

    return `${anoatual}-${mesAtual<10?$`${0}${mesAtual}`:mesAtual}-${diaAtual<10?`${0}${diaAtual}`:diaAtual}`
  }
  

  useEffect(()=>{
    
    async function alarmesCeluloseArray(){

      if(!filtroDataInicio || !filtroDataFim){
        const data = new Date()
        const anoatual = data.getFullYear()
        const mesAtual = data.getMonth()+1
        const diaAtual = data.getDate() 
   
        setFiltroDataInicio(`${anoatual}-${mesAtual<10?$`${0}${mesAtual}`:mesAtual}-${diaAtual<10?`${0}${diaAtual}`:diaAtual}`)
        setFiltroDataFim(`${anoatual}-${mesAtual<10?$`${0}${mesAtual}`:mesAtual}-${diaAtual<10?`${0}${diaAtual}`:diaAtual}`)
        
      }

      if (currentPage === 1 && alarmesCelulose.length === 0) {
        const dataTemp = date()
        
        let body = {"pagination" : currentPage,"area": filtroArea,"datainicio":filtroDataInicio?filtroDataInicio:dataTemp,"datafim":filtroDataFim?filtroDataFim:dataTemp}
         
        const data = await api.post('/alarmes/celulose', body)
  
        setAlarmesCelulose(data.data)
      }else{
        
        if((currentPage * itemsPerPage)>=alarmesCelulose.length){
        const dataTemp = date()
        let body = {"pagination" : currentPage,"area": filtroArea,"datainicio":filtroDataInicio?filtroDataInicio:dataTemp,"datafim":filtroDataFim?filtroDataFim:dataTemp}
         
        const data = await api.post('/alarmes/celulose', body)
          
        setAlarmesCelulose([...alarmesCelulose,...data.data])
        
        }else{
          return
        }
      } 
    }

    alarmesCeluloseArray();

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

  }, [alarmesCelulose, currentPage, itemsPerPage]);

 
  return (
    

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
                <h1>Alarmes Celulose</h1>
                <div>
                  <div id="itemsPerPage">
                    <span>Exibir</span>
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <form>
                    <ExportToExcel data={alarmesCelulose} fileName={'AlarmesCelulose'} id="excel"/>
                    <label>
                      Data de Início:
                      <input
                        type="date"
                        defaultValue={filtroDataInicio}
                        onChange={(e) => setFiltroDataInicio(e.target.value)}
                      />
                    </label>

                    <label>
                   
                      Data de Fim:
                      <input
                        type="date"
                        defaultValue={filtroDataFim}
                        onChange={(e)=> setFiltroDataFim(e.target.value)}
                      />
                    </label>
                  </form>
                </div>
              </HeaderTable>
                {alarmesCelulose.length>0&&
                <div id="scrollTable" ref={scrollContainerRef} >
                <table className="table minha-classe-personalizada" >
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
                      
                      <tr key={i} data-select={linhasSelecionadas.includes(d.alci_cd_identificador)}>
                        <td>{d.alci_ds_tag}</td>
                        <td>{d.alci_tx_usuario_2}</td>
                        <td>{d.alci_ds_tipo_alarme_1}</td>
                        <td>{d.alci_tx_usuario_1}</td>
                        <td>{d.alci_dt_alarme === null ? '-' : dateFormat(d.alci_dt_alarme.value)}</td>
                        <td>{d.alci_dt_final===null?'-' : timestampFormat(d.alci_dt_alarme.value)}</td>
                        <td>
                          <Button onClick={()=>{selectTableHandleClick(d.alci_cd_identificador)}}>
                            {linhasSelecionadas.includes(d.alci_cd_identificador)?<AiOutlineClose/>:<PiTargetThin  size={15}/>}
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

  function timestampFormat(date){
    const data = new Date(date)
    const offset = data.getTimezoneOffset(); // Diferença em minutos entre UTC e o fuso horário local
    const dataCorrigida = new Date(data.getTime() - (offset * -60000)); // Ajusta para UTC
    const hora = dataCorrigida.getHours();
    const minutos = dataCorrigida.getMinutes();
    const segundos = dataCorrigida.getMinutes();
    const milisegundos = dataCorrigida.getMilliseconds();

    return `${hora<10?`${0}${hora}`:hora}:${minutos}:${segundos}:${milisegundos}`
  }

  function selectTableHandleClick(key){
    

    if(linhasSelecionadas.includes(key)){
      setLinhasSelecionadas([...linhasSelecionadas.filter(item=>item!==key)])
      
    }else{
      setLinhasSelecionadas([...linhasSelecionadas,key])
      
    }
  }
}


