import { createServer } from 'http';
import { readFile } from 'fs';
import  net from 'net';
import plants from './utls/fake_data.js';

const server=createServer((req, res)=> 
{
  if(req.url==='/home'||req.url==='/') 
  {
    readFile('./HTML/home.html', (err, data)=> 
    {
      if (err) 
      {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } 
      else 
      {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
  else if(req.url==='/plants') 
  {
    readFile('./HTML/plants.html', (err, data)=> 
    {
      if (err) 
      {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } 
      else 
      {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } 
  else if(req.url==='/contact') 
  {
    readFile('./HTML/contact.html', (err, data)=> 
    {
      if (err) 
      {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } 
      else 
      {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
  else if(req.url==='/get/plants') 
  {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(JSON.stringify({ plants: plants }));
  }
  else
  {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
const serverPort = 3000;

server.listen(serverPort, () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
});




































// //------
// const client = new net.Socket();
// const host = 'localhost';
// const port = 5433; // Default PostgreSQL port
// const user = 'postgres';
// const password = 'Helpme08';
// const database = 'plants';

// client.connect(port, host, () => {
//   console.log("connected")

//   const authMessage = createAuthMessage(user, password, database);
//   client.write(authMessage);

//   const query = 'SELECT * FROM plant';
//   const queryMessage = createQueryMessage(query);

//   client.write(queryMessage);
// });

// let responseData = Buffer.alloc(0);

// client.on('data', (data) => {
//   responseData = Buffer.concat([responseData, data]);
//   // console.log(responseData);
//   // console.log('Received data from the server:', data.toString('utf-8'));
// });

// client.on('end', () => {
//   const result = responseData.toString('utf-8');
//   console.log(result);

//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({ data: result }));

//   client.destroy();
// });

// client.on('error', (err) => {
//   console.error('Socket error:', err);

//   res.writeHead(500, { 'Content-Type': 'text/plain' });
//   res.end('Internal Server Error');

//   client.destroy();
// });
//-0-----------------------


// function createAuthMessage(user, password, database) {
//   const packet = Buffer.alloc(256);
//   packet.writeUInt8(0x1, 0); // Protocol version
//   packet.write(user + '\0', 1, user.length + 1, 'utf-8');
  
//   const encryptedPassword = password;
//   packet.write(encryptedPassword, 1 + user.length + 1, encryptedPassword.length, 'binary');

//   packet.write(database + '\0', 1 + user.length + 1 + encryptedPassword.length, database.length + 1, 'utf-8');

//   return packet;
// }

// function createQueryMessage(query) {
//   const packet = Buffer.alloc(8 + query.length);
//   packet.writeUInt8(0x03, 0); // COM_QUERY
//   packet.write(query, 1, query.length, 'utf-8');

//   return packet;
// }