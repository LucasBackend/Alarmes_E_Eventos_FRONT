import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { LuFilterX } from "react-icons/lu";
import { PiTargetThin } from "react-icons/pi";
import '../../../src/index.css';
import logoCompleta from '../../assets/logocompleta.png';
import Logo from '../../components/Logo';
import MenuList from '../../components/MenuList';
import api from '../../service/api';
import ExportToExcel from './excel.jsx';
import { Container, MainTable } from './style';

const { Header, Sider } = Layout; 

export function AlarmesCelulose() {
  const scrollContainerRef = useRef(null);

  const [alarmesCelulose, setAlarmesCelulose] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filtroDataInicio,setFiltroDataInicio] = useState()
  const [filtroDataFim,setFiltroDataFim] = useState()
  const [filtroArea,setFiltroArea] = useState('')
  const [abrirFiltro,setAbrirFiltro] = useState(false)

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

    return `${anoatual}-${mesAtual<10?`${0}${mesAtual}`:mesAtual}-${diaAtual<10?`${0}${diaAtual}`:diaAtual}`
  }
  
  function reset() {
    setCurrentPage(1);
    setAlarmesCelulose([]);
  }

  function navigate(){
    window.location.href = "https://apps.powerapps.com/play/e/default-a7109315-9727-4adf-97ad-4849bb63edcb/a/c1a97402-4d2d-4397-a1a7-ae41801b791b?tenantId=a7109315-9727-4adf-97ad-4849bb63edcb&source=portal&screenColor=rgba(42%2C%2048%2C%2066%2C%201)&hidenavbar=true"
  }

  useEffect(()=>{
    
    async function alarmesCeluloseArray(){

      if(!filtroDataInicio || !filtroDataFim){
        const data = new Date()
        const anoatual = data.getFullYear()
        const mesAtual = data.getMonth()+1
        const diaAtual = data.getDate() 
   
        setFiltroDataInicio(`${anoatual}-${mesAtual<10?`${0}${mesAtual}`:mesAtual}-${diaAtual<10?`${0}${diaAtual}`:diaAtual}`)
        setFiltroDataFim(`${anoatual}-${mesAtual<10?`${0}${mesAtual}`:mesAtual}-${diaAtual<10?`${0}${diaAtual}`:diaAtual}`)
        
      }

      if (currentPage === 1 && alarmesCelulose.length === 0) {
        const dataTemp = date()
        
        let body = {"pagination" : currentPage,"area": filtroArea,"datainicio":filtroDataInicio?filtroDataInicio:dataTemp,"datafim":filtroDataFim?filtroDataFim:dataTemp}
         
        const data = await api.post('/alarmes/celulose', body)
        
        data.data.length>0?setAlarmesCelulose(data.data): null
        
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
      <Container>
        <div id="filtros" data-filter={abrirFiltro}>
          <span id="titlefilter">
            Filtros
          </span>
          <IoCloseOutline id="closefilter" onClick={()=>{setAbrirFiltro(false)}}/>

          <div id="listFilters">
            <label>
                      Data de Início:
                      <input
                        type="date"
                        defaultValue={filtroDataInicio}
                        onChange={(e) => {
                          setFiltroDataInicio(e.target.value)
                          reset()
                        }}
                      />
            </label>

            <label>
                   
                      Data de Fim:
                      <input
                        type="date"
                        defaultValue={filtroDataFim}
                        onChange={(e)=> {
                          setFiltroDataFim(e.target.value)
                          reset()
                        }}
                      />
            </label>

            <div id="filtroArea">
                      <label>Área</label>
                      <select name="" id="" onChange={(e) => {
                        setFiltroArea(e.target.value)
                        reset()
                      }}>
                      <option value=""></option>
                        <option value="Digestor">Digestor</option>
                        <option value="JE3">JE3</option>
                        <option value="JE2">JE2</option>
                        <option value="LFB">LFB</option>
                        <option value="LFC">LFC</option>
                        <option value="Outros">Outros</option>
                      </select>
            </div>
          </div>
        </div>
      <Layout>
          <Sider collapsed={collapsed} collapsible trigger={null} className="sidebar" width={260} style={{height:'100vh', background: 'var(--sami-main)', overflowY: "auto"}}>
            {collapsed?<Logo/>:<img src={logoCompleta} width={100} className='LogoCompleta' onClick={navigate}/>}
            <MenuList style={{height: 'auto'}} />
          </Sider>
          <Layout style={{height:'100vh',background:"#F4F6F9"}}>
            <Header id="header" style={{ padding: 0, background: colorBgContainer}} >
              
              <div className="titulo">
              <Button 
                type='text' 
                className='toggle'
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <MenuUnfoldOutlined /> : 
                <MenuFoldOutlined />} 
              />
              <h1>Alarmes Celulose</h1>
              </div>

              <div className="diversos">
                <ExportToExcel data={alarmesCelulose} fileName={'AlarmesCelulose'}/>
                <button id='filter' onClick={()=>{setAbrirFiltro(!abrirFiltro)}}>
                {abrirFiltro?<LuFilterX />:<FiFilter  />}
                </button>
              </div>
              
            </Header>
            
              <MainTable>
              
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
                        <td>{d.alci_dt_alarme ===null?'-' : timestampFormat(d.alci_dt_alarme.value)}</td>
                        <td>
                          <Button onClick={()=>{selectTableHandleClick(d.alci_cd_identificador)}}>
                            {linhasSelecionadas.includes(d.alci_cd_identificador)?<AiOutlineClose/>:<PiTargetThin  size={15} style={{ marginBottom: '3px' }}/>}
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

                  <div id="itemsPerPage">
                    <label>Exibir</label>
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </nav>
                }
                
              </MainTable>
          </Layout>
      </Layout>
      </Container>
                
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


