# Server
### Ejecución con **node**
Para iniciar el servidor se debe ejecutar con node
```sh
node src/server.js
```

El servidor puede recibir como argumentos:
- **modo**: puede correrse en modo **FORK** o **CLUSTER**, en caso de no especificar se ejecutará en **modo FORK por default**. En modo FORK se ejecutarán 2 procesos: el padre y el hijo. En modo CLUSTER se ejecutará un proceso padre y tantos procesos fork como procesadores tenga el CPU (si el CPU tiene 4 procesadores, seran 5 procesos).
- **port**: el puerto de escucha del servidor, en caso de no especificar el servidor escuchará en el **puerto 8080 por default**. 

**Ejemplos:**
```sh
node src/server.js --port=8081 --mode=CLUSTER
node src/server.js --port=8082 --mode=FORK
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
pm2 start src/server.js --name=servidor --watch -- -p=8081
```
##### Modo cluster
Para correr en modo cluster se debe agregar **-i** y la cantidad de procesos. Si se pasa como parámetro **-i max** se corren tantos procesos como procesadores tenga el CPU.
```sh
pm2 start src/server.js --name=servidor --watch -i max -- -p=8081
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
