import { Request, Response } from "express"
import pool from "../db";

interface IPostController {
  getAll(req: Request, res: Response): any;
  create(req: Request, res: Response): any;
}

class postController implements IPostController {
  async getAll(req: Request, res: Response) {
    try {
      console.log('getAll');
      pool.query("SELECT * FROM posts", (error: any, results: any) => {
        if (error) throw error
        console.log(results)
        res.status(200).json(results.rows);
      }) 
    } catch (error) {
      console.log(error);
    }
  }

  async create(req: Request, res: Response) {
    console.log(req);
    return res.json({message: "ok"})
  }
}

export default new postController();