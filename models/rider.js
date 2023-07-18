const mongoose = require("mongoose")

const scheme_user_login = new mongoose.Schema({
    
    whatsapp_no:{
        type: String,
        // required: true,
        unique: true
    },
    password:{
        type: String,
        // required: true,
    },
    security_code:{
        type: String,
        // required: true,
    },
    full_name: {
        type: String,
        // required: true,
    },
    on_off_rider: {
        type: Boolean,
        // required: true,
    }
    
    
} )

// new collection
const scheme_user_login_1 = new mongoose.model("scheme_user_login", scheme_user_login)

let schema = {
    scheme_user_login : scheme_user_login_1
}
module.exports = schema