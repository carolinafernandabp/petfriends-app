import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  currentMessage = new BehaviorSubject<MessagePayload | any>({ notification: { title: '', body: '' }, data: {} });


  constructor(private afMessaging: AngularFireMessaging) { }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        console.log('Permission granted! Save to the server!', token);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  receiveMessage() {
    this.afMessaging.messages.subscribe(
      (payload) => {
        console.log('Message received:', payload);
        this.currentMessage.next(payload);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  showCustomNotification(title: string, options?: NotificationOptions) {
    if (!('Notification' in window)) {
      console.error('This browser does not support system notifications');
      return;
    }

    if (Notification.permission === 'granted') {
      // If the user has granted permission, create the notification
      const notification = new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      // If the user hasn't decided yet, ask for permission first
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(title, options);
        }
      });
    }
  }
}

export interface MessagePayload {
  notification: {
    title: string;
    body: string;
  };
  data: {
    [key: string]: string;
  };
}

