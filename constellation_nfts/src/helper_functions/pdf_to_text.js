async function convertPdfToText(file) {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/convert_pdf', {
      method: 'POST',
      body: formData
    });
  
    return response.json();
  }
  