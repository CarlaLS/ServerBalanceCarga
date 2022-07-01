require('dotenv').config()

const app =require('./server')
require('./database');

const modoCluster = process.argv[3] == 'CLUSTER'

/* --------------------------------------------------------------------------- */
/* MASTER */
if(modoCluster && cluster.isMaster) {
    const numCPUs = os.cpus().length
    
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
} else {

  const PORT = process.env.PORT || 8080
  // const PORT = parseInt(process.argv[2]) || 8080
  const server = app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${server.address().port}/ - PID(${process.pid})`)
})
server.on('error', (error) => console.log(`Server error: ${error}`))
}


