import { createApp } from './http/server';

const app = createApp();

let port: string;
port = process.env.PORT || '5000';

app.listen(port, () => {
  console.log('listening on port ' + port);
});
