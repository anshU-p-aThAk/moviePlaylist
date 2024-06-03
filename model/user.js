const mongoose = require('mongoose');
const passport = require('passport');

exports.connectMongoose = () => {


     
    mongoose.connect(process.env.MONGODB_URI)
     .then(e=>console.log("Mongodb Connected"))
     .catch(e=>console.log(`${e} error`));

};

const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
    },
    username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      movies: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Movie'
        }
      ],
      isPrivate: {
        type : Boolean,
        default: false,
    },
    },
     {
      timestamps: true
})

exports.User = mongoose.model("User",userSchema);