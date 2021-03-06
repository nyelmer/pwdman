const mongoose = requrie("mongoose");

const PasswordSchema = new mongoose.Schema({

    owner_id: {
        type: String,
        requried: true,
    },
    website: {
        type: String,
        required: true
    },
    username: {
        type: String,
        requried: true,
    },
    password: {
        type: String,
        requried: true,
    },
    created_at: {
        type: Date,
        requried: true,
        default: new Date()
    },
    last_modification: {
        type: Date,
        default: new Date(),
    }

});

PasswordSchema.pre("save", function (next) {

    // Update the last_modification attribute
    this.last_modification = new Date()
    
    next();

});

module.exports = mongoose.model("Password", PasswordSchema);