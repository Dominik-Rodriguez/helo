const bcrpyt = require('bcryptjs');

module.exports = {
    register: async(req,res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.users.check_user({username});
        if(foundUser[0]){
            return res.status(400).send("Username is already in use.")
        }

        let salt = bcrpyt.genSaltSync(10),
        hash = bcrpyt.hashSync(password, salt);

        const newUser = await db.users.register_user({username, hash});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async(req,res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.users.check_user({username})
        if(!foundUser[0]){
            return res.status(401).send('Username or password is incorrect.')
        }

        const authenticated = bcrpyt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(401).send('Username or password is incorrect.')
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    logout: async(req,res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}