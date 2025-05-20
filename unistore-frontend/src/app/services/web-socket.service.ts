import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();
  private reconnectTimeout = 5000; // Reconnect delay in ms
  private token!: string; // Store token for reconnection

  constructor(private ngZone: NgZone,private snackbarService: SnackbarService) {}

  /**
   * Connects to the WebSocket server with authentication token
   * @param token JWT token for authentication
   */
  connect(token: string): void {
    this.token = token; // Store token for reconnect
    this.initializeWebSocket();
  }

  /**
   * Initializes the WebSocket connection
   */
  private initializeWebSocket(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.warn('WebSocket is already connected.');
      return;
    }

    this.socket = new WebSocket(`ws://localhost:3000`);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      this.authenticate();
    };

    this.socket.onmessage = (event) => {
      this.ngZone.run(() => {
        const message = JSON.parse(event.data);
        if (message.type === 'auth_success') {
          console.log('WebSocket authenticated successfully.');
        } else {
          this.handleIncomingMessage(message);
          this.messageSubject.next(message);
        }
      });
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.warn('WebSocket connection closed. Reconnecting...');
      setTimeout(() => this.initializeWebSocket(), this.reconnectTimeout);
    };
  }

  /**
   * Sends authentication message to the server
   */
  private authenticate(): void {
    if (this.token && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'authenticate', token: this.token }));
    }
  }

  /**
   * Sends a message through WebSocket
   * @param message Object to send
   */
  sendMessage(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected.');
    }
  }

  /**
   * Listens for incoming messages
   * @returns Observable for WebSocket messages
   */
  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  /**
   * Closes the WebSocket connection
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  /**
   * Handle incoming WebSocket messages and trigger Web Push Notification
   * @param message Received WebSocket message
   */
  private handleIncomingMessage(message: any): void {
    if (message.type === 'ntification') {
      this.snackbarService.notification(message.message)
    }
  }

  
}