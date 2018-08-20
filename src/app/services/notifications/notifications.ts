import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Notification } from '../../../entity/';

@Injectable()
export class NotificationsService {

    constructor(private http: Http) { }

    getAll(): Promise<Notification[]> {
        return new Promise((resolve, reject) => {
          try {
            this.http.get('/api/notifications').subscribe(data => {
              resolve(<Notification[]>data.json());
            });
          } catch (err) {
            console.log(err);
            reject(err);
          }
        });
      }
      getById(id: number): Promise<Notification> {
          return new Promise((resolve, reject) => {
            try {
              this.http.get('/api/notifications/' + id).subscribe(data => {
                resolve(<Notification>data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      insert(notification: Notification): Promise<number> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/notifications/insert', notification).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      update(notification: Notification): Promise<boolean> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/notifications/update', notification).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      delete(notification: Notification): Promise<boolean> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/notifications/delete', notification).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }

}