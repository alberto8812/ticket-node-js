//se va a manejar con singletoon
// ya que solo requiero la instancia de nuestro web socket server
import { Server } from 'http';
import {WebSocket, WebSocketServer} from 'ws'

interface Options {
    server:Server;
    path?:string;//dnde queremos que los web sockes se coenecten
}

export class WssService {
    private static _intance:WssService;//GUARDAR INTANCIA INICIALIZADA
    private wss:WebSocketServer;//nuestro web socke server

    private constructor(options:Options){//no queremos que se inicialice fuera de como los estamos progrmando
        const {server,path='/ws'}=options;//localhost:300/ws
        this.wss= new WebSocketServer({server,path});//solo se llama dentro de la misma clase
        this.start();

    }

    static get intance():WssService{//obtenermos la intancia de nuestro servidor singleton
        if(!WssService._intance){
            throw 'wssService is no initialized'
        }

        return WssService._intance;
    }

    static initWss(options:Options){//inicializa nuestro servidor
        WssService._intance=new WssService(options);//creamos la instancia
    }

    public sendMessage(type:string,payload:Object){
        //la idea es que sea generico 

        //enviar a todso los cliente conectados

        this.wss.clients.forEach(client=>{
            if(client.readyState===WebSocket.OPEN){
                client.send(JSON.stringify({type,payload}));
            }
        })

    }

    public start(){//recive las conecciones
        this.wss.on('connection',(ws:WebSocket)=>{
            console.log('client conectec')
            ws.on('close',()=>console.log('client disconnected'))
        })
    }
}
