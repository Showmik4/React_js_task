import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PdfDocument = ({ inputHistory }) => {
  const generatePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('All Data', 10, 10);

    const tableData = inputHistory.map(entry => [
      entry.projectName,
      entry.projectDescription,
      entry.projectClient,
      entry.projectContractor,
      entry.maxX,
      entry.minX,
      entry.maxY,
      entry.minY,
      entry.maxZ,
      entry.minZ,
    ]);

    doc.autoTable({
      head: [
        ['Project Name', 'Project Description', 'Project Client', 'Project Contractor', 'Max X', 'Min X', 'Max Y', 'Min Y', 'Max Z', 'Min Z']
      ],
      body: tableData,
      startY: 20,
    });

    const pdfDataUri = doc.output('datauristring');
    openPdfPreview(pdfDataUri);
  };

  const openPdfPreview = (pdfDataUri) => {
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write('<h2>Loading PDF Preview...</h2>');

      const iframe = document.createElement('iframe');
      iframe.src = pdfDataUri;
      iframe.frameBorder = 0;
      iframe.style.width = '100%';
      iframe.style.height = '100vh';

      previewWindow.document.body.innerHTML = '';
      previewWindow.document.body.appendChild(iframe);
    } else {
      alert('Please allow pop-ups for the PDF preview.');
    }
  };

  return (
    <div>
      {/* Button to generate PDF */}
      <button className='btn btn-danger' onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default PdfDocument;
