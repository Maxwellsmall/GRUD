import express, { Application, Request, Response } from "express"

interface user{
    id:number;
    email:string;
    firstName:string;
    lastName:string;
    password:string;
    createAt?:string;
    updatedAT?:string;
}

const app:Application = express();
const port = 4020;

let users:user[] = [];
app.get("/", (req:Request, res:Response)=>{
res.status(200).json({message:"Users information gotten successfully"})
})

app.post("/user", (req:Request, res:Response)=>{
    const{firstName, lastName, email, password,} = req.body
    const checkIfUserExist = users.findIndex(e=> e.email===email) ;
    if(checkIfUserExist !== -1){
    { 
        res.status(400).json({message:"user already exist"});
        
    }
     if(firstName && lastName && email && password ){
        const newUsers:user={
          firstName, id:users.length +1, email, password, lastName
        }
        users.push(newUsers)
        res.status(201).json({message:"users information created succesfully", data:newUsers})
     }else {
        res.status(400).json({message:"please fill this field"})
     }

    }
})
 app.patch("/", (req:Request<user>, res:Response)=>{
    const{firstName, lastName, password, email} = req.body;
    if(!email){
        res.status(400).json({message:"email is required"})
    }
    const findUser = users.find(e=>e.email === email)
    if(findUser){
        if(firstName) findUser.firstName = firstName;
        if(lastName) findUser.lastName = lastName;
        if(email) findUser.email = email;
        if(password) findUser.password = password;
        res.status(200).json({message:"user information updated successfully", data:findUser})
    }else{
        res.status(400).json({message:"user not found"})
    }

 })

app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`)
})