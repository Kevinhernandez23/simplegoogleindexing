const https = require('https');
const fs = require('fs');

const file = fs.readFileSync('urls.txt', 'utf8');
const urls = file.split('\n').map(url => url.trim());

urls.forEach(url => {
  const urlEncoded = encodeURIComponent(url);
  const apiKey = 'tu_clave_de_API_de_Google';
  const apiUrl = `https://www.googleapis.com/indexing/v3/urlNotifications:publish?key=${apiKey}`;
  
  const payload = {
    "url": url,
    "type": "URL_UPDATED"
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const req = https.request(apiUrl, options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (error) => {
    console.error(error);
  });
  
  req.write(JSON.stringify(payload));
  req.end();
});
