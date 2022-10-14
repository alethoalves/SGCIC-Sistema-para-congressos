import { Request } from "express-validator/src/base";

export const createSession = (req: Request,data) => {
    req.session.user = {
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        isAdmin: data.isAdmin,
        isReviewer: data.isReviewer,
        filter:"",
        filterDashboard:""
    }
    return req.session.user
};
export const destroySession = (req: Request) => {
    req.session.user = undefined;
}