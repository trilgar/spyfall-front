import {Injectable} from '@angular/core';
import {interval, Subject} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  pingInterval = 10000;
  source = interval(this.pingInterval);

  private errorMessageSource = new Subject<string>();
  currentErrorMessage = this.errorMessageSource.asObservable();

  private infoMessageSource = new Subject<string>();
  currentInfoMessage = this.infoMessageSource.asObservable();

  private gameCardMessageSource = new Subject<GameCardDto>();
  currentGameCardMessage = this.gameCardMessageSource.asObservable();

  private questionMessageSource = new Subject<QuestionDto>();
  currentQuestionMessage = this.questionMessageSource.asObservable();

  private answerMessageSource = new Subject<Answer>();
  currentAnswerMessage = this.answerMessageSource.asObservable();

  private suspectMapMessageSource = new Subject<Map<string, string[]>>();
  currentSuspectMapMessage = this.suspectMapMessageSource.asObservable();

  private conclusionMessageSource = new Subject<GameConclusion>();
  currentConclusionMessage = this.conclusionMessageSource.asObservable();

  private spyBustedMessageSource = new Subject<string>();
  currentSpyBustedMessage = this.spyBustedMessageSource.asObservable();

  private playerListMessageSource = new Subject<Player[]>();
  currentPlayerListMessage = this.playerListMessageSource.asObservable();

  private hostMessageSource = new Subject<string>();
  currentHostMessage = this.hostMessageSource.asObservable();

  private questionGrantedMessageSource = new Subject<string>();
  currentQuestionGrantedMessage = this.questionGrantedMessageSource.asObservable();

  private ws: WebSocket;
  openedStatus: boolean;

  constructor() {
    console.log('websocket constructor');
    this.initConnection();
    const ping = new Message(WsMessageType.PING, "", {});
    this.source.subscribe(() => this.sendMessage(ping));
  }

  initConnection(): void {
    this.connect();
    this.ws.onmessage = (data: MessageEvent) => {
      const parsedData = JSON.parse(data.data);
      // todo remove
      if(parsedData.event!==WsResponseType.PING){
        console.log('message', data.data);
      }
      this.handleMessage(parsedData);
    };

    this.ws.onclose = () => {
      console.log('ONCLOSE');
      this.initConnection();
    };
  }

  public connect(): void {
    this.ws = new WebSocket(environment.wsUrl);
    console.log('connection established');
  }

  sendMessage(msg: any): void {
    // todo remove if statement
    if(msg.event !== WsMessageType.PING){
      console.log('sending message', this.convert(msg));
    }
    if (this.ws.readyState !== 1) {
      setTimeout(() => this.ws.send(this.convert(msg)), 400);
    } else {
      this.ws.send(this.convert(msg));
    }

  }

  close(): void {
    this.ws.close();
  }

  convert(msg: any): string {
    return JSON.stringify(msg);
  }

  handleMessage(message: ResponceMessage): void {
    switch (message.event) {
      case WsResponseType.PING: {
        break;
      }
      case WsResponseType.ERROR: {
        alert(message.data)
        break;
      }
      case WsResponseType.INFO: {
        this.infoMessageSource.next(message.data);
        break;
      }
      case WsResponseType.ENTITY: {
        this.handleEntity(message);
        break;
      }
    }
  }

  handleEntity(message: ResponceMessage): void {
    switch (message.dataType) {
      case DataType.GAMECARD_DATA_TYPE: {
        this.gameCardMessageSource.next(message.data);
        break;
      }
      case DataType.QUESTION_DTO_DATA_TYPE: {
        this.questionMessageSource.next(message.data);
        break;
      }
      case DataType.ANSWER_DATA_TYPE: {
        this.answerMessageSource.next(message.data);
        break;
      }
      case DataType.SUSPECT_MAP_DATA_TYPE: {
        this.suspectMapMessageSource.next(message.data);
        break;
      }
      case DataType.SPY_BUSTED_DATA_TYPE: {
        this.spyBustedMessageSource.next(message.data);
        break;
      }
      case DataType.GAME_CONCLUSION_DATA_TYPE: {
        this.conclusionMessageSource.next(message.data);
        break;
      }
      case DataType.PLAYER_LIST_DATA_TYPE: {
        this.playerListMessageSource.next(message.data);
        break;
      }
      case DataType.HOST_DATA_TYPE: {
        this.hostMessageSource.next(message.data);
        break;
      }
      case DataType.QUESTION_GRANTED_PERSON_DATA_TYPE: {
        this.questionGrantedMessageSource.next(message.data);
        break;
      }

      default: {
        throw "Unknown data type. Cannot handle data type" + message.dataType;
      }

    }
  }
}


export class Message {
  event: WsMessageType;
  token: string;
  data: any;


  constructor(event: WsMessageType, token: string, data: any) {
    this.event = event;
    this.token = token;
    this.data = data;
  }
}

export enum WsMessageType {
  REGISTER = 'REGISTER',
  STARTGAME = 'STARTGAME',
  RESTART = 'RESTART',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
  SUSPECT = 'SUSPECT',
  GUESSLOCATION = 'GUESSLOCATION',
  PING = 'PING',
  CONNECTED = 'CONNECTED',
  GETHOST = 'GETHOST',
  GETLOCATION='GETLOCATION'
}

export class ResponceMessage {
  event: WsResponseType;
  dataType: DataType;
  data: any;
}

export enum WsResponseType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  ENTITY = 'ENTITY',
  PING = 'PING'
}

export enum DataType {
  STRING_DATA_TYPE = 'string',
  GAMECARD_DATA_TYPE = 'gameCard',
  QUESTION_DTO_DATA_TYPE = 'questionDto',
  ANSWER_DATA_TYPE = 'answer',
  SUSPECT_MAP_DATA_TYPE = 'suspectMap',
  GAME_CONCLUSION_DATA_TYPE = 'conclusion',
  SPY_BUSTED_DATA_TYPE = 'spyBusted',
  PLAYER_LIST_DATA_TYPE = 'playerList',
  HOST_DATA_TYPE = 'host',
  QUESTION_GRANTED_PERSON_DATA_TYPE = 'questionGranted'
}

export class Card {
  id: number;
  name: string;
  pictureUrl: string;
}

export class GameCardDto {
  questionGranted: string;
  gameCard: Card;
}

export class Answer {
  question: string;
  answer: string;
}

export enum Winner {
  SPY = 'SPY',
  CITIZENS = 'CITIZENS'
}

export class GameConclusion {
  winner: Winner;
  conclusion: string;
  spyName: string;
  locationName: string;
}

export class Question {
  source: string;
  target: string;
  question: string;
}

export class QuestionDto {
  message: string;
  question: Question;
}

export class SpyBustedCase {
  message: string;
}

export enum SuspectAction {
  SET = 'SET',
  REMOVE = 'REMOVE'
}

export class Suspect {
  suspectAction: SuspectAction;
  suspecting: string;
  suspected: string;
}

export class Player {
  username: string;
  suspecting: string[];
}
