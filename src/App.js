
const express = require('express');
const app = express();


const ingredients = [
    {
        "id": "1",
        "item": "Bacon"
    },
    {
        "id": "2",
        "item": "Eggs"
    },
    {
        "id": "3",
        "item": "Milk"
    },
    {
        "id": "4",
        "item": "Butter"
    }
];

app.get('/ingredients', (req, res) =>{
    res.send(ingredients);
});



app.listen(3001);


const cors = require('cors');
app.use(cors({
    origin: '*'
}));




//el src no se puede usar como para modificar en un archivo de css, conviene usar el nombre de la clase que le di a la imagen.