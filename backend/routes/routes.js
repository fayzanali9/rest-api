const express = require('express');
const path = require('path');
const router = express.Router();
const Model = require('../model/model');

//Post Method
// router.post('/post', (req, res) => {
//     res.send('Post API')
// })


router.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'../../frontend/main.html'));
  });

router.post('/add', async (req, res) => {
    console.log(`name : ${req.body.name}`);
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
// router.get('/getAll', (req, res) => {
//     res.send('Get All API')
// })

router.get('/view/all', async (req, res) => {
    try{
        const data = await Model.find();
        res.render('data', { data });
        // res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get by ID Method
router.post('/view', async(req, res) => {
    try{
        console.log('id of person: ',req.body.id);
        const data = await Model.findById(req.body.id);
        console.log(data);
        res.send(` ID: ${data._id},    Name: ${data.name},  Age: ${data.age} `);
        // res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//     res.send(` ID: ${row.ID},    Name: ${row.NAME}`)
// })

//Update by ID Method
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })
router.post('/update', async (req, res) => {
    try {
        const id = req.body.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



//Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })

router.post('/delete', async (req, res) => {
    try {
        const id = req.body.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with name ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;