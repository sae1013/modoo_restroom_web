import fs from 'fs';
import https from 'https';
import next from 'next';

const port = 3000;
const hostname = 'localhost';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./localhost.key'), // 생성된 개인 키 파일
  cert: fs.readFileSync('./localhost.crt'), // 생성된 인증서 파일
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      handle(req, res);
    })
    .listen(port, hostname, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
