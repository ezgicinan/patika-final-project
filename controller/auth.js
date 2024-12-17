const authcontroller = {
    login: async(req, res) => {
        try{
            console.log("auth controller'a geldik");
            res.status(200).send({response:'Login page'});
        }catch(error){
            console.log('Error #auth/login: ', error);
        }
    },
    register: async(req, res) => {
        try{
            console.log("auth controller'a geldik");
            res.status(200).send({response:'Register page'});
        }catch(error){
            console.log('Error #auth/register: ', error);
        }
    },
}

module.exports = authcontroller;