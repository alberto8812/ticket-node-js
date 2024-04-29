import { UuidAdapter } from "../../config/uuid.adapter";
import { TicketEntity } from "../domain/entity/ticket.entity";
import { WssService } from './wss.service';

export class TicketService {

  constructor(
    private readonly wssService=WssService.intance,
  ){}

  public  tickets: TicketEntity[] = [
    { id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createdAt: new Date(), done: false },
  ];



  public readonly workingOnTickets:TicketEntity[]=[]



  public get pendingTickts(): TicketEntity[] {

    return this.tickets.filter(
      (ticket) => ticket.done === false && !ticket.handleAtDesk
    );
  }

  public get lastWorkingOnTickets():TicketEntity[]{
    return this.workingOnTickets.slice(0,4);
  }

  public get lastiTicketNumber() {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  public createTicket() {
    const newTicket: TicketEntity = {
      id: UuidAdapter.v4(),
      number: this.lastiTicketNumber + 1,
      createdAt: new Date(),
      done: false,
      handleat: undefined,
      handleAtDesk: undefined,
    };
    this.tickets.push(newTicket);
    //todo ws
    this.onTicketNumberChanged();
    return newTicket;
  }

  public drawTicket(dek: string) {
    const ticket = this.tickets.find((t) => !t.handleAtDesk);
    if (!ticket)
      return { status: "error", message: "Nohay tickets pendientes" };
    ticket.handleAtDesk = dek;
    ticket.handleat = new Date();
    this.workingOnTickets.unshift({...ticket});
    this.onTicketNumberChanged();
    this.onWorkinOnchange()
    return { status: "ok", ticket };
  }

  public onFinishedTicket(id: string) {
    const ticket = this.tickets.find((t) => t.id === id);
    if (!ticket) return { status: "error", message: " tickets no  encontrado" };

    this.tickets=this.tickets.map((ticket) => {
      if (ticket.id === id) {
        ticket.done = true;
      }
      return ticket;
    });
    return { status: "ok" };
  }

  private onTicketNumberChanged(){
    this.wssService.sendMessage('on-ticket-count-changed',this.pendingTickts.length);
  }
  private onWorkinOnchange(){
    this.wssService.sendMessage('on-working-changed',this.lastWorkingOnTickets);
  }
}
