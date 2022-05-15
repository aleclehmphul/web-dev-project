const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.getUsers();
        res.send(users);
    } catch (err) {
        res.status(401).send({message: err.message});
    }
});

router.post('/getUser', async (req, res) => {
    try {
        const users = await User.getUser(req.body);
        res.send(users);
    } catch (err) {
        res.status(401).send({message: err.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body.username, req.body.password);
        res.send( { ...user, password: undefined } );
    } catch(error) {
        res.status(401).send({message: error.message});
    }
})

router.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body);
        res.send({...user, password: undefined});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

router.delete('/delete', async (req, res) => {
    try {
        await User.deleteUser(req.body.userId);
        res.send({success: "We'll Miss You :("});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

router.put('/edit', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.editUser(req.body);
        res.send({...user, password: undefined});
    } catch (error) {
        res.status(401).send({message: error.message});
    }
})

module.exports = router;