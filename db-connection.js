// smitdhameliya801
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://smitdhameliya801:smit801@cluster0.w5hjmll.mongodb.net/rider", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("connection success...")).catch((error) => console.log(error))