

function renderTickets(tickets = []) {
    for (let i = 0; i < tickets.length; i++) {
        if (i >= 4) break;
        const ticket = tickets[i];
        if (!ticket) continue
        const lbltiTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
        const lbldesk = document.querySelector(`#lbl-desk-0${i + 1}`);
        lbltiTicket.innerText = `Ticket ${ticket.number}`
        lbldesk.innerText = `Ticket ${ticket.handleAtDesk}`
    }
}

async function getTicketsDesk() {
    const TicketsDesk = await fetch('/api/ticket/working-on').then(resp => resp.json());
    if (!TicketsDesk) return
    renderTickets(TicketsDesk);
}


function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data)
        if (type !== 'on-working-changed') return;
        renderTickets(payload)
    };

    socket.onclose = (event) => {
        console.log('Connection closed');
        setTimeout(() => {
            console.log('retrying to connect');
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}

getTicketsDesk();
connectToWebSockets();