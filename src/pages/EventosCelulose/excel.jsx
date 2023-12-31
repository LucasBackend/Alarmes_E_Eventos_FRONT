import React from 'react';
import * as XLSX from 'xlsx';
import { SiMicrosoftexcel } from "react-icons/si";

const ExportToExcel = ({ data, fileName, sheetName }) => {
  function dateFormat(date){
    const data = new Date(date);
    const offset = data.getTimezoneOffset(); // Diferença em minutos entre UTC e o fuso horário local
    const dataCorrigida = new Date(data.getTime() - (offset * -60000)); // Ajusta para UTC
    

    return dataCorrigida;
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
  
  
  const exportToExcel = () => {
   
    const formattedData = data.map(item => {
      return {
        TAG: item.even_ds_tag,
        DESCRIÇÃO: item.even_tx_usuario_2,
        TIPO: item.even_ds_tipo_alarme_1,
        ALARME:item.even_tx_usuario_1,
        DATA:item.even_dt_evento===null?'-':dateFormat(item.even_dt_evento.value),
        HORA:item.even_dt_evento===null?'-':timestampFormat(item.even_dt_evento.value)
        
      };
    });

    // Criar a planilha a partir dos dados formatados
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // Criar o livro e adicionar a planilha
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet 1');

    // Salvar o arquivo Excel
    XLSX.writeFile(wb, `${fileName || 'data'}.xlsx`);
  };

  

  return (
    <button onClick={exportToExcel}><SiMicrosoftexcel/></button>
  );
};

export default ExportToExcel;