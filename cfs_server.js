/*
 * Name:          cfs_server.js
 * Author:        George Lomas
 * Date:          29-06-2025
 * Purpose:       Cyberfreak Software web server
 * Run command:   cd Web_CyberfreakSoftware; npm run start
*/

import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use((req, res, next) => {
  express.json()(req, res, next);
});

const port = 3001;
app.listen(port);


// Set up the view engine
app.set('view engine', 'ejs');

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname, 'views'));

// Set the MIME type for JavaScript files
app.use(express.static('Web_CyberfreakSoftware', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.set("Content-Type", "application/javascript");
    }
  }
}));


// Serve images
app.use(express.static(path.join(__dirname, 'images')));


// Define route to render page
app.get('/', async (req, res) => {
  res.render('cfs_home', {
    cfs_logo: '/cfs_logo.png',
    cfs_transparent: '/cfs_transparent.png',
    mm_logo: '/full-logo-white.png',
  });
});