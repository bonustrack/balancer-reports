import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import reports from './reports';

// @ts-ignore
const top100Str = Object.entries(reports).slice(0, 100).reduce((a, b: any) => {
  return `${a}\n${b[0]}:${b[1].total}`;
}, '');

export default (app) => {
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  // @ts-ignore
  app.use(serveStatic(`${__dirname}/dist`));
  app.get('/top-100', (req, res) => {
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-disposition', 'attachment; filename=balancer-top-100.txt');
    res.send(top100Str);
  });
  // @ts-ignore
  app.get('/', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));
  app.get('*', (req, res) => res.redirect('/'));
}
