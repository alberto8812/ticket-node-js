export class TicketEntity {
  constructor(
    public id: string,
    public number: number,
    public createdAt: Date,
    public handleAtDesk?: string,
    public handleat?: Date,
    public done?: boolean
  ) {}

  static fromOnject(object: { [key: string]: any }) {
    const { id, number, createdAt, handleAtDesk, handleat, done } = object;
    return new TicketEntity( id, number, createdAt, handleAtDesk, handleat, done)
  }
}
