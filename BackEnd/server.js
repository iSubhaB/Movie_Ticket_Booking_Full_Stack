const express= require("express")
const cors= require("cors")
const route= require("./Router/router")

const app= express()
const port= 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/Document", express.static("Document"));


app.use("/home",route)


app.listen(port,()=>{
    console.log(`Srever running on port ${port}`);
})