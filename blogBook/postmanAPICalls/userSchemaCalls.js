const express = require('express')
const router = express.Router()
const User = require('../schema/user')
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds


router.get('/', async(req,res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: 'There was an error fetching users' });
      }
})

router.get('/:id', async(req,res) => {
    try{
           const user = await User.findById(req.params.id)
           res.json(user)
    }catch(err){
        res.send('Error in getting user with given id ' + err)
    }
})


// Create User
router.post('/register', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await user.save();
    console.log('User saved with hashed password');

    // Send a success response
    res.status(200).json({ message: 'User registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);

    // Send an error response
    res.status(500).json({ error: 'User registration failed' });
  }
});

// Only username and password can be updated
router.patch('/:id',async(req,res)=> {
    try{
        const user = await User.findById(req.params.id) 
        user.username = req.body.username
        user.password = req.body.password
        const result = await user.save()
        res.json(result)   
    }catch(err){
        res.send('Error in Updaing User')
    }

})

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.remove();
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  });

// User Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user with the provided username
    const user = await User.findOne({ username });
    
    if (user) {
      // User exists, now compare the password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      
      if (isPasswordMatch) {
        // Password matches
        // Send the user data in the response
        res.status(200).json({ message: 'Login successful', userId: user._id });
      } else {
        // Password is incorrect
        res.status(401).json({ message: 'Login failed' });
      }
    } else {
      // User not found
      res.status(401).json({ message: 'Login failed' });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router