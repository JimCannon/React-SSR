import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

//When browser tries communicate with our render-server that starts with "api"
//third arguement(proxyReqOptDecorator..) in the parameter is optional(needed for this project)
app.use(
  '/api', 
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  })
);
app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = createStore(req);

  // Some logic to initialize
  // and load data into the store
  const promises = matchRoutes(Routes, req.path).map(({route}) => {
    return route.loadData ? route.loadData(store) : null;
  });
  
  //await all promises, send response after as a bundle.
  Promise.all(promises).then(() => {
    res.send(renderer(req,store));
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

// https://react-ssr-api.herokuapp.com/