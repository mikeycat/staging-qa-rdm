import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Session } from '../../../entity/';

@Injectable()
export class SessionsService {

    constructor(private http: Http) { }

    getAll(): Promise<Session[]> {
        return new Promise((resolve, reject) => {
          try {
            this.http.get('/api/sessions').subscribe(data => {
              resolve(<Session[]>data.json());
            });
          } catch (err) {
            console.log(err);
            reject(err);
          }
        });
      }
      getById(id: number): Promise<Session> {
          return new Promise((resolve, reject) => {
            try {
              this.http.get('/api/sessions/' + id).subscribe(data => {
                resolve(<Session>data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      insert(session: Session): Promise<number> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/sessions/insert', session).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      update(session: Session): Promise<boolean> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/sessions/update', session).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      delete(session: Session): Promise<boolean> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/sessions/delete', session).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }

}