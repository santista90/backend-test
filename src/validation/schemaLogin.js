const yup = require('./config');

const schemaLogin = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required()
});


module.exports =  schemaLogin;