import { Router } from 'express';
import { TicketRotes } from './tickets/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
     router.use('/api/ticket', TicketRotes.routes );



    return router;
  }


}

