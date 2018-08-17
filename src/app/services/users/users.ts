import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../../entity/';

@Injectable()
export class UsersService {

    constructor(private http: Http) { }

    getAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
          try {
            this.http.get('/api/users').subscribe(data => {
              resolve(<User[]>data.json());
            });
          } catch (err) {
            console.log(err);
            reject(err);
          }
        });
      }
      getById(id: number): Promise<User> {
          return new Promise((resolve, reject) => {
            try {
              this.http.get('/api/users/' + id).subscribe(data => {
                resolve(<User>data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      insert(user: User): Promise<number> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/users/insert', user).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      update(user: User): Promise<boolean> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/users/update', user).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }
      delete(user: User): Promise<boolean> {
          return new Promise((resolve, reject) => {
            try {
              this.http.post('/api/users/delete', user).subscribe(data => {
                resolve(data.json());
              });
            } catch (err) {
              console.log(err);
              reject(err);
            }
          });
      }

}