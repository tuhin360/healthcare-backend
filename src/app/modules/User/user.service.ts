// service: handle data process, query

import { Request, Response } from "express";
 
const createAdmin = async () => {
    return {
        message: "Admin created successfully",
    }
};

export const userService = {
    createAdmin,
};