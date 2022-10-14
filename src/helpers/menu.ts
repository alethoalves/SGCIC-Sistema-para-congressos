import { Request, Response } from 'express';
type typesMenu = 'menuAdmin' | 'menuReviewer' |'menuUser';
type menuObjects = 'myArticles' | 'myProfile' | 'events' | 'subareas' | 'articlesForReview' | 'myReviews';
export const createMenuObject = (req:Request,activeMenu:menuObjects) => {
    let typeMenu;
    if (req.session.user) {
        if(req.session.user.isAdmin){
            typeMenu = 'menuAdmin';
        }else if(req.session.user.isReviewer){
            typeMenu = 'menuReviewer'
        }else{
            typeMenu = 'menuUser'
        }
    } 
    let returnObject = {
        types:{
            menuUser:false,
            menuAdmin:false,
            menuReviewer:false
        },
        objects:{
            myArticles: false,
            myProfile: false,
            events: false,
            subareas:false,
            myReviews: false
        }
    }
    returnObject.types[typeMenu]=true;
    returnObject.objects[activeMenu]=true;

    return returnObject
}
