
const fetch = require('node-fetch');
fetch('http://localhost:3000/register').then(response => response.json()).then(data => {
    console.log(data)
})
