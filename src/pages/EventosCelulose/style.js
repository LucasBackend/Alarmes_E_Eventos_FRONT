import styled from 'styled-components';


export const HeaderTable = styled.div `
width:99%;
height: 100px;
background:#f9f9f9;
margin: 0 auto;
border-radius:8px;
margin-top: 10px;
margin-bottom: 3px;
padding: 1rem;

>h1 {
  font-size: 1.8rem;
}

>div {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 2.5rem 0;
}

>div #itemsPerPage {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin-top: 1.5rem;
}

>div #itemsPerPage span {
  margin-top: 3px;
}

>div #filtroArea {
  display: flex;
  flex-direction: column;
}

>div #filtroArea select {
  width: 9rem;
  height: 2rem;
  margin-bottom: 3px;
  margin-left: 0;
}

>div form {
  display: flex;
  gap: 2rem;

  >button{
    height:40px;
    width: 40px;
    background:none;
  }
  >button svg{
    width:25px;
    height:25px;
  }
}

>div form label{
  display: flex;
  flex-direction: column;
}

>div select {
  width: 5rem;
  align-items: center;
  text-align: center;
  margin-left: 5px;
}

`

export const MainTable = styled.div`
width:99%;
height:95%;
border-radius:8px;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
background:#fff;



>#scrollTable {
  overflow-y:auto;
  margin-bottom:5px;
  height: 65vh;
}

>#scrollTable::-webkit-scrollbar{
  width: 0rem;
}

>#scrollTable::-webkit-scrollbar-track {
  background-color: transparent;
}

>#scrollTable::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 0px;
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

  > tbody tr td:nth-child(7){
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
  margin-top:30px;
}

>nav ul li a{
  font-size:15px;
  margin:0;
  display:flex;
  align-items:center;
}


`


