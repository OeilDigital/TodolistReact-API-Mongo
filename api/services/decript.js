const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// mettre UserSchema dans ./models

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

async function comparePassword(email, password) {
    const user = await User.findOne({ email });
    if (!user) return false;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}

comparePassword("user@example.com", "userpassword")
    .then(isMatch => console.log(isMatch))
    .catch(error => console.error(error));