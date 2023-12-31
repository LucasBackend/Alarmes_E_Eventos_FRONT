import styled from 'styled-components';


export const Container = styled.div`
width:100%;
position:relative;
overflow-x:hidden;

>#filtros{
  background:black;
  width:260px;
  height: 93.3%;
  opacity:1;
  position:absolute;
  z-index:5;
  right:0;
  bottom:0;
  background:#2A3042;
  border-radius:3px;
  transform: translateX(0);
  transition: max-height 0.5s ease-in-out, transform 0.5s ease-in-out, opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;

  &[data-filter="false"]{
    position:absolute;
    z-index:5;
    right:0;
    bottom:0;
    opacity: 0;
    transform: translateX(100%);
   
    
    
  }

  >#titlefilter{
    position:absolute;
    color:white;
    font-size:14px;
    font-family:"Montserrat",sans-serif;
    font-weight:normal;
    top:5px;
    left: 10px;
    
  }

  >#closefilter{
    top: 0;
    right:0;
    position:absolute;
    stroke:white;
    width:25px;
    height:25px;
    cursor: pointer;
  }

}

#header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  box-shadow: 3px 2px 0px 0px rgba(221,226,231,1);

  >.titulo{
    display:flex;
    align-items:center;

    >h1{
    margin-left: 30px;
    font-family:"Montserrat";
    font-size:22px;
    margin-bottom:0
  }
  }

  >.diversos{
    background:transparent;
    display:flex;
    align-items:center;
    gap:10px;
    margin-right:10px;

    >#excel{
      width:35px;
      height:35px;
      background:#556EE6;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:3px;
      transition: background 0.3s ease;

      &:hover{
        background:#7499E1;
      }

      >svg{
        width:20px;
        height:20px;
        fill:white;
      }
    }

    >#filter{
      width:35px;
      height:35px;
      background:#556EE6;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:3px;
      transition: background 0.3s ease;

      &:hover{
        background:#7499E1;
      }

      >svg{
        width:20px;
        height:20px;
        fill:transparent;
        stroke:white;
      }

    }

    >#refresh{
      width:35px;
      height:35px;
      background:#556EE6;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:3px;
      transition: background 0.3s ease;

      &:hover{
        background:#7499E1;
      }

      >svg{
        width:20px;
        height:20px;
        fill:white;
        
      }

    }

    >div #print{
      width:35px;
      height:35px;
      background:#556EE6;
      display:flex;
      align-items:center;
      justify-content:center;
      border-radius:3px;
      transition: background 0.3s ease;

      &:hover{
        background:#7499E1;
      }

      >svg{
        width:20px;
        height:20px;
        stroke:white;
        
      }

    }
  
  }
  
}

#listFilters{
  margin-top:20px;
  height:95%;
  display:flex;
  flex-direction:column;
  padding:15px;
  gap:25px;
  overflow-y:auto;

  &::-webkit-scrollbar{
  width: 5px;
  }

  &::-webkit-scrollbar-track {
  background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
  background-color: #7499E1;
  border-radius: 5px;
  }

  >*{
    font-family:"Montserrat",sans-serif;
    font-size:14px;
    color:white;
    display:flex;
    flex-direction:column;
    gap:10px;
    
  }
  
  >label input{
    padding:5px;
    border-radius:2px;
  }

  >#filtroArea input, label, #filtroproc input, label{
    font-family:"Montserrat",sans-serif;
  }

  >#filtroArea select, #filtroproc select{
    padding:5px;
    border-radius:2px;
  }

  >#filtrotag input{
    padding:5px;
    border-radius:2px;
  }

  
  >#LimparFiltros{
    width:80%;
    margin:65px auto 0 ;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:7px;
    border-radius:3px;
    background:#556EE6;
    font-family:'Montserrat',sans-serif;
    cursor: pointer;
    font-weight:normal;

    &:hover{
        background:#7499E1;
      }
  }

  >#filtrotipo input{
    padding:5px;
    border-radius:2px;
  }

  >#filtroalarme input{
    padding:5px;
    border-radius:2px;
  }

  >#filtrodescricao input{
    padding:5px;
    border-radius:2px;
  }

}
`

export const MainTable = styled.div`
width:99%;
height:100%;
border-radius:8px;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
background:#fff;
overflow-y:hidden;


>#scrollTable {
  overflow-y:auto;
  overflow-x:auto;
  margin-bottom:5px;
  height: 90%;
}

>#scrollTable::-webkit-scrollbar{
  width: 0rem;
  height:5px;
}

>#scrollTable::-webkit-scrollbar-track {
  background-color: transparent;
}

>#scrollTable::-webkit-scrollbar-thumb {
  background-color: #7499E1;
  border-radius: 5px;
}

>#scrollTable table {
  width: 99%;
  margin: 10px auto 15px;
  overflow-y:auto;

  > thead tr th {
    text-align: start;
    padding: 10px 0 10px 5px;
    
    position: sticky;
    top: 0;
    z-index: 1;
    font-size: 1.6rem;
    font-weight: normal;
    background-color: #eff2f7;
  }

  > tbody tr td {
    height: 4rem;
    padding: 0 10px 4px 10px;
    vertical-align: bottom;
    

  }

  > table thead th div { 
    display: flex;
    align-items: center;
    justify-content: center; 
    text-align: center;
  }

  > tbody tr td:nth-child(9){
    text-align: end;
    padding-bottom: 4px; 
  }

  & tbody tr:nth-child(odd) * {
    background-color: white;
  }

  & tbody tr:nth-child(even) * {
    background-color: #f9f9f9;
  }

  >tbody tr { 
    &[data-select='true']{
      *{
        transition: 2s ease;
        background:#F46A6A;
      }

      >td button{
        border-color:white;
      }

      >td button svg {
        fill:white;
        background:transparent;
        color:transparent;
        margin-bottom: 2px;
      }
    }
  }
}

>nav {
  margin-top:15px;
  display:flex;
  align-items:baseline;
  justify-content:center;
  position:relative;

  >#itemsPerPage{
    display:flex;
    align-items:center;
    position:absolute;
    right:10px;
    gap:5px;
    font-size:16px;

    >*{
      cursor: pointer;
    }
  }

}

>nav ul li a{
  font-size:15px;
  margin:0;
  display:flex;
  align-items:center;
}


`


