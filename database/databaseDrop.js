const {sequelize} = require('../databaseDriver');
const {usermodel} = require('../models/UserModel');

function dropDB() {
    return new Promise(async(resolve, reject) =>{
        try {
            await sequelize.drop().then(() => {
                console.log("All the tables dropped");
                resolve(true);
            });
        } catch (error) {
            reject(error);
        }
    });
    
}

dropDb().then(() =>{
    sequelize.close();
}).catch((err) =>{
    console.error(err);
});