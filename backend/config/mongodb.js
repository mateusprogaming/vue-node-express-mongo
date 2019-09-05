const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/spider_stats', { useNewUrlParser: true })
    .catch(e => {
        const msg = 'ERRO!! Nao foi possivel conectar com o mongoDB'
        console.log('\z1b[41m%s\x1b[37m', msg, '\x1b[om')
    })