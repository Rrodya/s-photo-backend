import { Request, Response } from "express";
import multer from "multer";
import pool from "../db";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage});

class FileController {
  async upload(req: Request, res: Response) {
    try {
      upload.single("image")(req, res, (err) => {
        if(err) {
          console.log("Error uploading image: " + err);
          res.status(500).json({error: "Error uploading image"})
        } else {
          if(req.file == undefined) {
            throw Error; 
          }
          // const imageUrl = `${req.protocol}://${req.get('host')}/${imagePath}`;

          const imagePathArr = req.file.path.split("/");        
          const imageName = imagePathArr[imagePathArr.length - 1];
  
          pool.query('INSERT INTO images (url) VALUES ($1)', [imageName], (error) => {
            if (error) {
              console.error('Error saving image URL to database:', error);
              res.status(500).json({ error: 'Error saving image URL to database' });
            } else {
              res.json({ imageName });
            }
          });
        }
      })
    } catch (error) {
      console.log("Error download file");
    }
  }
}

export default new FileController();