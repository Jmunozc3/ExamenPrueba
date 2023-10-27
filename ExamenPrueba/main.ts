
import express, {Response,Request} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";


import { Hobbits } from "./Person.ts";
import { Humanos } from "./Person.ts";
import { Elfos } from "./Person.ts";
import { Enanos } from "./Person.ts";
import { Ents } from "./Person.ts";


const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    id:{ type: Number, required: true },
    name: { type: String, required: true },
    raza: { type: String, required: true},
    descripcion: { type: String, required: true },
    habilidades: { type: String, required: true },
  },
  { timestamps: true }
);

export type PersonModelType = mongoose.Document & Omit<Person, "id">;

//export default mongoose.model<PersonModelType>("Person", personSchema);

export const PersonModel =mongoose.model<PersonModelType>("Person",personSchema);

await mongoose.connect("mongodb+srv://juan:12345@cluster0.i5x1im4.mongodb.net/juan?retryWrites=true&w=majority");

const app = express();

app.get("/api/tierramedia/personajes", async (res:Response,req:Request)=>{

    const a= await PersonModel.find().exec();

    res.send(JSON.stringify(a)); 

})


app.get("/api/tierramedia/personajes/:id", async (res:Response,req:Request)=>{

    const idd=req.params.id;
    const a= await PersonModel.find({
        id:idd
    }).exec();

    res.send(JSON.stringify(a)); 

})

app.post("/api/tierramedia/personajes/:id/:nombre/:raza/:descripcion/:habilidades",async (req:Request, res:Response)=>{

    
    const a=  new PersonModel({
        id:req.params.id,
        nombre: req.params.name,
        raza: req.params.raza,
        descripcion: req.params.descripcion,
        habilidades: req.params.habilidades,
      });
      await a.save();
      res.send(JSON.stringify(a));

});

app.put("/api/tierramedia/personajes/:id/:nombre/:raza/:descripcion/:habilidades" ,async (req:Request, res:Response)=>{

    const idd=req.params.id;

    const actualizacion= await PersonModel.findByIdAndUpdate ({id: idd},{
        nombre: req.params.name,
        raza: req.params.raza,
        descripcion: req.params.descripcion,
        habilidades: req.params.habilidades,
      });

      res.send(JSON.stringify(actualizacion));
})

app.delete("/api/tierramedia/personajes/:id" ,async (req:Request, res:Response)=>{

    const idd=req.params.id;

    const actualizacion= await PersonModel.findByIdAndDelete({id: idd}).exec();

    res.send(JSON.stringify(actualizacion));

}) 

app.listen(3000,()=>{console.log("Programa funciona correctamente")});
