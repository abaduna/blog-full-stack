const express = require("express")
const morgan = require("morgan")
const database = require("./database")
const mysql = require("promise-mysql")
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors


const app = express()

//config
app.set("port",3000)
app.use(cors());

// Configura body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middlewares
app.use(morgan("dev"))


//routes
app.get("/blogs",async(req,res)=>{
    try {
        const connection = await database.getConnection();
        const result = await connection.query("SELECT * from blogs");
        
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error en la consulta:", error);
        await connection.end();
        res.status(500).json({ error: "Error en la consulta" });
    }
})
app.get("/blogs/:id",async(req,res)=> {
    const id = req.params.id
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * from blogs WHERE id = ${id};`);
    res.status(200).json(result)
})
//creacion de un nuevo blog

app.post("/blogs", async (req, res) => {
    
    try {
 const {title,estado} = req.body
    console.log(title);
    console.log(estado);
    // Asegúrate de ajustar esto según la estructura de tu objeto JSON

    const connection = await database.getConnection();
    
    // Utiliza una sentencia preparada para evitar SQL injection
    const result = await connection.query( 
        `INSERT INTO blogs (title, estado) VALUES ('${title}', '${estado}')`
    );
    res.status(200).json({ message: 'Blog agregado con éxito' });        
    } catch (error) {
        console.error("Error en la consulta:", error);
        await connection.end();
        res.status(500).json({ error: "Error en la consulta" });
    }
   
    
});

app.put("/blogs/:id",async(req,res)=> {
    //llamado de los datos
    const id = req.params.id
    const connection = await database.getConnection();
    const result = await connection.query(`SELECT * from blogs WHERE id = ${id};`);
    
     blogUnchanged =  result[0]
     
    let {title,estado} = req.body
    console.log(estado);
    console.log(title);
    if (!title) {
        title =  blogUnchanged.title
    }
    if (!estado) {
        estado =  blogUnchanged.estado
    }
    console.log(`estado modificado? ${title}`);
    console.log(`estado modificado? ${estado}`);
    try {
        const upDate = await connection.query(`UPDATE blogs SET title='${title}', estado='${estado}' WHERE id = ${id};`);
        res.status(200).json({ message: 'Blog actualizado con éxito' });
        console.log(upDate);
    } catch (error) {
        console.error(error);
        await connection.end();
        return res.status(500).json({ error: 'Internal Server Error' });
    }
   // const upDate = await connection.query(`UPDATE SET title='${title}',estado='${estado}' WHERE id = ${id};`);
   

   
})

app.delete("/blogs/:id",async(req,res)=>{
    
    try {
      const id = req.params.id
    const connection = await database.getConnection();
     await connection.query(`DELETE FROM blogs WHERE id =?;`,[id]);
    
    
    res.status(200).json({ message: 'Blog eliminado con éxito' });  
    } catch (error) {
        console.error('Error al eliminar el blog:', error);
        await connection.end();
        res.status(500).json({ message: 'Error al eliminar el blog' });

    }
})
app.listen(3000,()=>{
    console.log(`corriendo por el puerto 3000`);
})