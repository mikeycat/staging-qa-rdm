import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Result } from './../../../entity';

@Injectable()
export class ResultsService {

  constructor(private http: Http) { }

  getAll(): Promise<Result[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/results').subscribe(data => {
          resolve(<Result[]>data.json());
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  getById(id: number): Promise<Result> {
      return new Promise((resolve, reject) => {
        try {
          this.http.get('/api/results/' + id).subscribe(data => {
            resolve(<Result>data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  insert(result: Result): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/results/insert', result).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  update(result: Result): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/results/update', result).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  delete(result: Result): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/results/delete', result).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
}