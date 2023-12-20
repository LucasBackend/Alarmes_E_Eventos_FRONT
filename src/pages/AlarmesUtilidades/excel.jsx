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
        TAG: item.alci_ds_tag,
        DESCRIÇÃO: item.alci_tx_usuario_2,
        TIPO: item.alci_ds_tipo_alarme_1,
        ALARME:item.alci_tx_usuario_1,
        DATA:item.alci_dt_alarme===null?'-':dateFormat(item.alci_dt_alarme.value),
        HORA:item.alci_dt_alarme===null?'-':timestampFormat(item.alci_dt_alarme.value),
        AREA: item.alci_ds_area,
        PROC_SECTION: item.alci_ds_sub_area_2
        
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
    <button onClick={exportToExcel} id='excel'><SiMicrosoftexcel/></button>
  );
};

export default ExportToExcel;