import express,{Express,Request,Response,NextFunction} from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import cookie_parser from 'cookie-parser'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
import db from './DB/db'
import { system_log_type } from './type/log_type';

const app:Express=express()

app.use(cors({credentials:true,origin:true}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
app.use(cookie_parser())

app.get('/',async(req:Request,res:Response,next:NextFunction)=>{

    res.status(200).json({message:'welcome'})

})


app.post('/save_logs',async(req:Request,res:Response,next:NextFunction)=>{

    const obj:system_log_type=req.body

    await db.execute(`INSERT INTO logs (system_type,memory_usage,cpu_type,disk_usage,date_time)
    VALUES ('${obj.system_type}','${obj.memory_usage}','${obj.cpu_type}','${obj.disk_usage}','${obj.date_time}')`);

    res.status(200).json({message:'status saved'})

})

app.get('/get_logs',async(req:Request,res:Response,next:NextFunction)=>{

    await db.execute(`SELECT * from logs`);

    res.status(200).json({message:'status saved'})

})

app.listen(process.env.PORT ? +process.env.PORT : 8000)