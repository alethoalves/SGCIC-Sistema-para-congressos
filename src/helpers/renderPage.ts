import { query, Request, Response } from 'express';

export const  renderPage = (res: Response,path: string,variables: object) => {
    res.render(path,variables)
}