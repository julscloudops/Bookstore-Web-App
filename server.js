const http = require('http'),
      app = require('./app'),
      port = process.env.PORT || 8080,
      server = http.createServer(app);

      server.listen(port, () => {
        console.log("El servidor esta corriendo en el puerto: "+ port);
      });
      


