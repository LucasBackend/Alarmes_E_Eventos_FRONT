import React from 'react';
import html2canvas from 'html2canvas';
import { IoCameraOutline } from "react-icons/io5";

export const CaptureAndCopyToClipboard = ({Tela}) => {
  const handleCaptureAndCopy = async () => {

    const elemento = document.getElementById(Tela)
    // Use html2canvas para converter a tela inteira em uma imagem
    const canvas = await html2canvas(elemento);

    // Obtenha a URL da imagem gerada
    const imageDataUrl = canvas.toDataURL('image/png');

    // Cria um elemento de imagem para a imagem capturada
    const img = new Image();
    img.src = imageDataUrl;

    // Cria um elemento temporário para realizar a cópia para a área de transferência
    const tempElem = document.createElement('div');
    tempElem.contentEditable = true;
    tempElem.appendChild(img);

    // Adiciona o elemento temporário ao corpo do documento
    document.body.appendChild(tempElem);

    // Seleciona e copia o conteúdo do elemento temporário
    const range = document.createRange();
    range.selectNodeContents(tempElem);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    // Remove o elemento temporário
    document.body.removeChild(tempElem);

    // Notificação ou feedback ao usuário
    alert('Captura de tela copiada para a área de transferência!');
  };

  return (
    <div>
      <button onClick={handleCaptureAndCopy} id='print'><IoCameraOutline /></button>
    </div>
  );
};
