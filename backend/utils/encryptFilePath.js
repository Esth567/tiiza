
const crypto = require("crypto")

const encryptFilePath = (filePath){
    const cipher = crypto.createDecipheriv("ase-s56-cbc","qwertrtrtrt")


    let encrypted = cipher.update(filePath,"utf-8","hex");
    encrypted = cipher.final("hex");
    return encrypted;
}


module.exports = {encryptFilePath}