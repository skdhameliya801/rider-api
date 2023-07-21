// smitdhameliya801
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://smit801:smit801@cluster0.hotxn1c.mongodb.net/rider801", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("connection success...")).catch((error) => console.log(error))