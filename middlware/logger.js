// simply used to format the dates
const { format } = require('date-fns')

// const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
// Cryptographically-strong random values
const {v4: uuid } = require('uuid')

// used to read files in sync or async manner
const fs = require('fs')
const fsPromises = require('fs').promises

// used to connect the path 
const path = require('path')

const logEvents = async(message, logFileName)=>{
    const dateTime = format(new Date(), 'yyyyMMdd \t HH:mm:ss')
    // uuid() creates an specific id for each log
    const logItem = `${dateTime} \t ${uuid()} \t ${message}\n`

    // checking for the folder exist for not
    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    }catch(error){
        console.log(error)
    }
}


// forming an middleware
// this will log every req that comes from client side
const logger = (req, res, next)=>{
    // here reqLog.log is simple text file
    logEvents(`${req.method} \t ${req.url} \t ${req.headers.orgin}`, 'reqLog.log')
    
    console.log(`${req.method} \t ${req.path}`)
    // ablitiy to next middleware
    next()
}

// passing an object
module.exports = { logEvents, logger }