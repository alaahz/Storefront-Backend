import express,{Request, Response, Application} from 'express';
import routing from './components/routes'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';


dotenv.config()



const app  = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/',(req:Request, res:Response) : void => {
    res.status(200).send('Welcome to Storefront Back Project')
})

routing.api(app);



app.get('*',(req:Request, res:Response) : void => {
    res.status(404).send('Page not fount')

})


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

export default app;