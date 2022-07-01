
const indexController = {};



indexController.renderIndex =(req, res)=> {
    res.render ('index')
};

indexController.renderAbout =(req, res)=> {
    res.render ('about')
};

const resultado1= `${process.platform}`
const resultado2= `${process.version}`
const resultado3= `${process.memoryUsage}`
const resultado4= `${process.execPath}`
const resultado5 = `${process.pid}`
const resultado6= `${process.cwd()}`
// const resultado7= `${numCPUs}`

indexController.renderInfo =(req, res)=> {
    // return(resultado )
    res.render('info', {resultado1,resultado2, resultado3,resultado4,resultado5,resultado6})
     
}



module.exports = indexController