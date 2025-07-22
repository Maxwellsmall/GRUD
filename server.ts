import express, {Application, Request, Response} from "express"

interface User{
    id:number,
    firstName:string,
    email:string
    lastName:string,
    password:string,
    createdAt?:string,
    updateAt?:string

}

const app: Application = express()
const port = 5000;

let user: User[] = []

app.get("/", (req:Request<User>, res:Response) => {
    res.status(200).json({message: "data gotten successfully", data: user})
})

app.post("/", (req:Request, res:Response) => {
    const {firstName, lastName, email, password,} = req.body

    const checkIfUserExist = user.findIndex(e => e.email === email)

    if (checkIfUserExist !== -1){
        res.status(200).json({message: "user already exist"})
    }
    if(firstName && lastName && password && email){
        const newUser: User = {
            id: user.length + 1,
            firstName, lastName, email, password
        }
        
        user.push(newUser)
        res.status(201).json({message: "User created successfully", data: newUser})
    } else{
        res.status(400).json({message: "All fields are require"})
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
})

