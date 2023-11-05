import express,{Express,Request,Response,NextFunction} from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import cookie_parser from 'cookie-parser'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
import db from './DB/db'

const app:Express=express()

app.use(cors({credentials:true,origin:true}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
app.use(cookie_parser())

app.get('/',async(req:Request,res:Response,next:NextFunction)=>{

    res.status(200).json({message:'welcome'})

})


app.post('/save_logs',async(req:Request,res:Response,next:NextFunction)=>{

    console.log(req.body)
    res.status(200).json({message:'status saved'})

})

app.listen(process.env.PORT ? +process.env.PORT : 8000)