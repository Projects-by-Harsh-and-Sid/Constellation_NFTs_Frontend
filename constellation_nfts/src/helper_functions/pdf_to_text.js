async function convertPdfToText(file) {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('http://localhost:5500/convert_pdf', {
      method: 'POST',
      body: formData
    });
  
    return response.json();
  }

export { convertPdfToText };