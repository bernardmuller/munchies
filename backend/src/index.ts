import { createApp } from './http/server';

const app = createApp();

let port: string;
port = process.env.PORT || '8080';

app.listen(port, () => {
  console.log('listening on port ' + port);
});
