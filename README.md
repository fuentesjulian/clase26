# Server
### Ejecución con **node**
Para iniciar el servidor se debe ejecutar con node
```sh
node src/server.js
```

El servidor puede recibir como argumentos:
- **modo**: puede correrse en modo **FORK** o **CLUSTER**, en caso de no especificar se ejecutará en **modo FORK por default**. En modo FORK se ejecutarán 2 procesos: el padre y el hijo. En modo CLUSTER se ejecutará un proceso padre y tantos procesos fork como procesadores tenga el CPU (si el CPU tiene 4 procesadores, seran 5 procesos).
- **port**: el puerto de escucha del servidor, en caso de no especificar el servidor escuchará en el **puerto 8080 por default**. 
- **database**: el método de persistencia para la base de datos de produtos y mensajes, en caso de no especificar elegirá **mongoDB por default**. Las opciones son **mongo** para utilizar mongoDB, **file** para almacenar los datos en un archivo o **mem** para almancer en memoria (al reiniciar la app esta base se destruye) 

**Ejemplos:**
```sh
node src/server.js --port=8081 --mode=CLUSTER --database=mongo
node src/server.js --port=8082 --mode=FORK --database=mem
node src/server.js -p=8081 -m=CLUSTER --database=file
node src/server.js -p=8082 -m=FORK
```
### Ejecución con **nodemon**
Hay que asegurarse tener **nodemon** instalado. Para instalarlo globalmente correr:
```sh
npm i nodemon -g
```
Al ejecutar con nodemon se pueden especificar exactamente los mismos argumentos que al ejecutar con node. El total de procesos es 1 más que al ejecutar con los mismos parámetros en node:
- **modo FORK**: 1 proceso de nodemon que escucha los cambios en el código y se ejecuta cada vez que se graban los archivos, 1 proceso padre y 1 proceso hijo.
- **modo CLUSTER**: 1 proceso de nodemon que escucha los cambios en el código y se ejecuta cada vez que se graban los archivos, 1 proceso padre y tantos procesos hijos como procesadores tenga el CPU. Si el CPU tiene 4 procesadores, serán 6 procesos.

**Ejemplos:**
```sh
nodemon src/server.js --port=8081 --mode=CLUSTER
nodemon src/server.js --port=8082 --mode=FORK
```
### Ejecución con **forever**
Hay que asegurarse tener **forever** instalado. Para instalarlo globalmente correr:
```sh
npm i forever -g
```
Para ejecutar con forever se debe correr **forever start**, y puede recibir parámetros. De esta manera se pueden ejecutar más de un proceso a la vez. Se puede agregar el argumento --watch para asegurar que forever esté atento a las modificaciones de los archivos. Ejemplo:
```sh
forever start src/server.js --port=8081 --watch
forever start src/server.js --port=8082 --watch
forever start src/server.js --port=8083 --watch
```
Para listar los procesos por sistema operativo se agrega el parámetro **list**:
```sh
forever list
```
Para terminar los procesos correr forever agregando el parámetro **stopall**:
```sh
forever stopall
```
### Ejecución con **PM2**
Hay que asegurarse tener **PM2** instalado. Para instalarlo globalmente correr:
```sh
npm i PM2 -g
```
##### Modo fork
Para ejecutar con PM2 se debe correr **pm2 start**. Se puede definir el nombre del proceso con --name, también se puede agregar el argumento --watch para asegurar que pm2 esté atento a las modficiaciones de los archivos. Para definir los parámetros de ejecución, antes hay que agregar dos guiones --. 

Ejemplo:
```sh
pm2 start src/server.js --name=servidor --watch -- --port=8081
```
##### Modo cluster
Para correr en modo cluster se debe agregar **-i** y la cantidad de procesos. Si se pasa como parámetro **-i max** se corren tantos procesos como procesadores tenga el CPU.
```sh
pm2 start src/server.js --name=servidor --watch -i max -- --port=8081
```
**Nota**: este modo de ejecución para este servidor generará escuchas sobre el mismo puerto generando conflictos.
Para listar los procesos por sistema operativo se agrega el parámetro **list**:
```sh
pm2 list
```
Para terminar los procesos correr forever agregando el parámetro **delete**. Se puede definir el proceso a eliminar o borrar todos con **all**
```sh
pm2 delete all
```
### Ejecución con **Nginx**
Se plantean dos situaciones simulando diferentes usos para evaluar funcionalidades.
##### Caso 1: simulando modo cluster nativo
Se quiere redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster. Para hacer esto se debe iniciar el servidor. Con pm2:
```sh
pm2 start src/server.js --name=servidor1 --watch -- --port=8081 --mode=CLUSTER
```
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080. Para hacer esto primero se debe iniciar el servidor. Con pm2:
```sh
pm2 start src/server.js --name=servidor2 --watch
```
Los servidores deberían estar corriendo en los puertos 8080 y 8081.
Renombrar el archivo **nginx.conf.opt1** a **nginx.conf** y ubicarlo en la carpeta conf de nginx y luego ejecutar nginx. Nginx debería estar levantando el servidor en el puerto 80.
##### Caso 2: simulando clusters gestionados desde nginx
Se quiere redigir todas las consultas a /api/randoms a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente, manteniendo el resto de las consultas en el puerto 8080.
El servidor del puerto 8080 no requiere modificaciones en su modo de ejecución a comparación con el caso anterior.
```sh
pm2 start src/server.js --name=servidor1 --watch 
```
Se corren 4 servidores, en los puertos 8082, 8083, 8084 y 8085.
```sh
pm2 start src/server.js --name=servidor2 --watch -- --port=8082
pm2 start src/server.js --name=servidor3 --watch -- --port=8083
pm2 start src/server.js --name=servidor4 --watch -- --port=8084
pm2 start src/server.js --name=servidor5 --watch -- --port=8085
```
Los servidores deberían estar corriendo en los puertos 8080, 8082, 8083, 8084 y 8085.
Renombrar el archivo **nginx.conf.opt2** a **nginx.conf** y ubicarlo en la carpeta conf de nginx y luego ejecutar nginx. Nginx debería estar levantando el servidor en el puerto 80.
### Testeos
Se crearon dos scripts de testeos, uno hecho con axios como un módulo aparte y otro hecho con mocha, chai y supertest.
##### Testeo con axios
Para correr el test con axios se debe iniciar el servidor y, una vez corriendo, se debe ejecutar el siguiente comando:
```sh
node tests/axiosTests.js
```
En el mismo se testo:
- Método **GET** para obtener todos los elementos de la base de datos
- Método **GET** pasando un **id como parámetro** para obtener el elemento que tenga dicho id
- Método **POST** para crear un nuevo elemento
- Método **PUT** para editar un elemento
- Méotodo **DELETE** para eliminar un elemento
##### Testeo con mocha, chai y supertest
Para correr el test con mocha, chai y supertest, ya se creó un script en el package.json. No hace falta iniciar el servidor. El mismo se ejecuta con el siguiente comando:
```sh
npm run test
```
**Los testeos incluyen:**
- POST
  - Al crear un item, deberia retornar status 201, un id y la data del item creado (95ms)
- GET
  - Al hacer un get, deberia retornar (1) status 200 y (2) un array (39ms)
- GET /id
  - Al hacer un get por el ID del item creado, deberia retornar (1) status 200 y (2) los datos del item creado
- PUT /id
  - Al editar el item creado, deberia retornar status 200
  - La data en el server del item editado deberia hacer match con la data enviada para editar
- DELETE
  - Al eliminar el item, deberia retornar status 200
  - Una vez eliminado el item, si lo busco por ID tiene que retornar un objeto vacio