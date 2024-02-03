const program = require('commander');
const axios = require('axios');
const FormData = require('form-data');

const fs = require('fs');

exports.uploadtitlebasics =async (path) => {
    try {
      // Check if the file exists
      fs.accessSync(path);

  
      // Read the file asynchronously
      const fileData = fs.createReadStream(path);
  
      // Create FormData
      const formData = new FormData();
      formData.append('file', fileData);
  
      // Send a POST request to the server
      const response = await axios.post(`${BASE_URL}/ntuaflix_api/admin/upload/titlebasics`, formData, {
        headers: {
          ...formData.getHeaders(), // Set proper headers for form data
        },
      });
  
      console.log(response.data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error('Error: File not found.');
      } else {
        console.error('Error uploading title basics:', error.message);
      }
    }
  };
