const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title:'Users Api',
        description: 'Users Api'
    },
    host: 'https://cse-341-project2-6xrp.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
