const express = require('express');
const mongoose = require('mongoose');
const Pokemon = require('./models/pokemon'); // Certifique-se de que o caminho está correto

const app = express();
const port = 5001;

app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/pokemonDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB Connected');
});

// Rota para buscar todos os Pokémon
app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para buscar Pokémon pelo nome
app.get('/pokemons/:name', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ name: req.params.name.toLowerCase() });
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).json({ message: 'Pokémon not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

