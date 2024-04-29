import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController {
  constructor(private readonly ticketService = new TicketService()) {}

  public getTickets = (req: Request, res: Response) => {
    res.json(this.ticketService.tickets);
  };
  //   public getTicketNumber = (req: Request, res: Response) => {

  //   };
  public getLastTicketNumber = (req: Request, res: Response) => {
    res.json(this.ticketService.lastiTicketNumber);
  };
  public pendingTickets = (req: Request, res: Response) => {
    res.json(this.ticketService.pendingTickts);
  };
  public createTicket = (req: Request, res: Response) => {
    res.json(this.ticketService.createTicket());
  };
  public drawTicket = (req: Request, res: Response) => {
     const { desk } = req.params;
    res.json(this.ticketService.drawTicket(desk));
  };
  public ticketFinished = (req: Request, res: Response) => {
    const { ticket } = req.params;
    console.log(ticket)
    res.json(this.ticketService.onFinishedTicket(ticket));
  };
  public workingOn = (req: Request, res: Response) => {
    res.json(this.ticketService.lastWorkingOnTickets);
  };
}
