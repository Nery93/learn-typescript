import type { Request, Response, NextFunction } from "express";

export function errorHandler(err:Error, req: Request, res:Response, next:NextFunction) 
{
    const mensagemErro = err.message
    res.status(400).json({ message: mensagemErro });
}