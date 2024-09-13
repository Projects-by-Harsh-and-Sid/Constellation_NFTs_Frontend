
const uploadImage = async (imageData) => {
    try {
      // Create a Blob from the Uint8Array
      const blob = new Blob([new Uint8Array(imageData)], { type: 'image/jpeg' }); // Adjust type if necessary
  
      // Create a FormData object and append the blob
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg'); // Adjust filename if necessary
  
      // Send the POST request to your Flask server
      const response = await fetch('http://localhost:5500/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const filename = await response.text();
      
      // Construct the full URL for the uploaded image
      const fullImageUrl = `http://localhost:5500/image/${filename}`;
  
      return {
        success: true,
        url: fullImageUrl,
        message: 'Image uploaded successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  export  {uploadImage};