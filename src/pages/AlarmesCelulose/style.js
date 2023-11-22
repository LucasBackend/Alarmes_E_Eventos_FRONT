import styled from 'styled-components';

export const MainTable = styled.div`
width:99%;
height:95%;
border-radius:5px;
margin-top:10px;
margin-bottom:10px;
margin-left:10px;
background:#fff;

> table {
  width: 99%;
  margin: 10px auto 15px;
  > thead tr th {
    font-size: 1.6rem;
    font-weight: normal;
    background-color: #eff2f7;
  }
}
  > thead tr th {
    text-align: center;
    padding: 25px 0 25px;
  }

> table thead th div { 
    display: flex;
    align-items: center;
    justify-content: center; 
    text-align: center;
  }


  & tbody tr:nth-child(odd) * {
    background-color: white;
  }

  & tbody tr:nth-child(even) * {
    background-color: #f9f9f9;
  }
`


