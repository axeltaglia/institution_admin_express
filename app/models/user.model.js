const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: String,
    image:String
},{timestamps:true});

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err)
});

UserSchema.methods.comparePassword=function(candidatePassword,next) {
    bcrypt.compare(candidatePassword,this.password, function(err,isMatch){
        if(err) return next(err);
        next(null,isMatch)
    })
};

module.exports = mongoose.model("User", UserSchema);