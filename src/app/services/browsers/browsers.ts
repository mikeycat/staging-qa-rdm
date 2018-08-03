import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Browser } from './../../../entity';

@Injectable()
export class BrowsersService {

  constructor(private http: Http) { }

  getAll(): Promise<Browser[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/browsers').subscribe(data => {
          resolve(<Browser[]>data.json());
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  getById(id: number): Promise<Browser> {
      return new Promise((resolve, reject) => {
        try {
          this.http.get('/api/browsers/' + id).subscribe(data => {
            resolve(<Browser>data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  insert(browser: Browser): Promise<Browser> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/browsers/insert', browser).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  update(browser: Browser): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/browsers/update', browser).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  delete(browser: Browser): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/browsers/delete', browser).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
}