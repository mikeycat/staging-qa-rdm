import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LineOfService } from './../../../entity';

@Injectable()
export class LinesOfServiceService {

  constructor(private http: Http) { }

  getAll(): Promise<LineOfService[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/lines-of-service').subscribe(data => {
          resolve(<LineOfService[]>data.json());
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  getById(id: number): Promise<LineOfService> {
      return new Promise((resolve, reject) => {
        try {
          this.http.get('/api/lines-of-service/' + id).subscribe(data => {
            resolve(<LineOfService>data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  insert(lineOfService: LineOfService): Promise<LineOfService> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/lines-of-service/insert', lineOfService).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  update(lineOfService: LineOfService): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/lines-of-service/update', lineOfService).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  delete(lineOfService: LineOfService): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/lines-of-service/delete', lineOfService).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
}