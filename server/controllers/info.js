import { Category,Information } from "../models";

export function information(req,res){
    return Category.findAll({
        include:[{model:Category}]
    }).then((Categories)=>{
        if(!Categories){
            return res.status(404).send({message:"Not found"});
        }
        
    })
}