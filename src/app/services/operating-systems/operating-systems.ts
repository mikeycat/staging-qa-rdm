import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { OperatingSystem } from './../../../entity';


@Injectable()
export class OperatingSystemsService {

  constructor(private http: Http) { }

  getAll(): Promise<OperatingSystem[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/operating-systems').subscribe(data => {
          resolve(<OperatingSystem[]>data.json());
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  getById(id: number): Promise<OperatingSystem> {
      return new Promise((resolve, reject) => {
        try {
          this.http.get('/api/operating-systems/' + id).subscribe(data => {
            resolve(<OperatingSystem>data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  insert(operatingSystem: OperatingSystem): Promise<OperatingSystem> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/operating-systems/insert', operatingSystem).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  update(operatingSystem: OperatingSystem): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/operating-systems/update', operatingSystem).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  delete(browser: OperatingSystem): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/operating-systems/delete', browser).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
}