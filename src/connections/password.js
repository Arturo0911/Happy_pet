const bcryptjs = require('bcryptjs');
const Hasheo = {};

Hasheo.encrypPassword = async(password) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
};

Hasheo.UnionPasswords = async(password, savedPass) => {
    try {
        return await bcryptjs.compare(password, savedPass);
    } catch (err) {
        console.log('error in: ', err);

    }
};

Hasheo.createRandomNumber = () => {
    const name = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let number = 0;
    for (let i = 0; i < 9; i++) {
        number += name.charAt(Math.floor(Math.random() * name.length));
    }
    return number;
}

module.exports = Hasheo;