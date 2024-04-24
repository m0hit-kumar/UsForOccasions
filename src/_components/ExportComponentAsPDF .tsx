// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';


// const ExportComponentAsPDF = (component: any, fileName: any) => {

//     const element = React.createElement(component);

//     html2canvas(element).then(canvas => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const imgProps = pdf.getImageProperties(imgData);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//         pdf.save(fileName);
//     });
// };


// export default ExportComponentAsPDF;