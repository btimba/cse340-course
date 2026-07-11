import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const app = express();

/**
  * Configure Express middleware
  */
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

/**
  * Routes
  */
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();  
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Service Projects' });
});

app.get('/category', (req, res) => {
  res.render('category', { title: 'Service Categories' });
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
