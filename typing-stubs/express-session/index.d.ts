import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    user: { 
      name:string;
      cpf:string;
      email:string;
      isAdmin:boolean;
      isReviewer:boolean;
      filter:string;
      filterDashboard:string
    }
  }
}