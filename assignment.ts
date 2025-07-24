import express, { Application,Request, Response } from "express" 

interface User{
    firstName:String,
    lastName:string
    password:string
    email:string,
    createdAt?:string,
    updatedAt?:string
    id:number
}

const app:Application = express()
const port = 4000

let user: User[] =[]

app.get("/", (req:Request, res:Response) => {
    res.status(200).json({message: "Data gotten successfully", data: user})
})

app.post("/user", (req:Request, res:Response) => {
    const {firstName, lastName, email, password} = req.body

    const checkIfUserExist = user.findIndex(e => e.email === email)

    if(checkIfUserExist !== -1){
        res.status(400).json({message: "User already exist"})
    }
    if(firstName && lastName && email && password){
        const newUser:User = {
            firstName, lastName,password, email, id: user.length + 1
        }
        user.push(newUser)
        res.status(201).json({message: "User information created successfully", data: newUser})
    } else{
        res.status(400).json({message: "All fields are required"})
    }

})

app.patch("/", (req:Request, res:Response) => {
    const {firstName, lastName, email, password} = req.body

    if(!email){
        res.status(400).json({message: "email is required"})
    } const findUser = user.find(e => e.email === email)
    if(findUser){
        if(firstName) findUser.firstName = firstName;
        if(lastName) findUser.lastName = lastName;
        if(email) findUser.email= email;
        if(password) findUser.password = password;

        res.status(200).json({message: "User info updated", data: findUser})
    } else{
        res.status(400).json({message: "user not found"})
    }
    
   
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
})