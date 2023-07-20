import { Request, Response } from "express"
import pool from "../db";

interface IPost {
  id: number;
  descriptions: string;
  pucture_url: string;
}

type IGetAllRresponse = IPost[];

interface IPostController {
  getAll(req: Request, res: Response): any;
  create(req: Request, res: Response): any;
}

class postController implements IPostController {
  async getAll(req: Request, res: Response) {
    try {
      const page: number = Number(req.query.page);
      const size = 10;
      const offset = (page - 1) * size;

      const result = await pool.query("SELECT * FROM posts ORDER BY id LIMIT $1 OFFSET $2", [size, offset])
      
      res.json(result.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async create(req: Request, res: Response) {
    const { description, picture_url } = req.body;

    try {
      const query = "INSERT INTO posts (description, picture_url) VALUES ($1, $2) RETURNING *";
      const values = [description, picture_url];

      const { rows } = await pool.query(query, values);

      res.status(201).json({ message: "Post created", post: rows[0]});
    } catch (error) {
      console.log("Error creating post: " + error);
      res.status(500).json({ error: "Error creating post" })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    
      if(rows.length == 0) {
        res.status(404).json({ error: "Post not found"});
      } else {
        res.json({ post: rows[0] });
      }
    } catch (error) {
      console.log("Error get one post " + error);
      res.status(500).json({ error: "Error getting post"});
    }
  }
}

export default new postController();