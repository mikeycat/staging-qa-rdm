import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Platform } from './../../../entity';

@Injectable()
export class PlatformsService {

  constructor(private http: Http) { }

  getAll(): Promise<Platform[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/platforms').subscribe(data => {
          resolve(<Platform[]>data.json());
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  getById(id: number): Promise<Platform> {
      return new Promise((resolve, reject) => {
        try {
          this.http.get('/api/platforms/' + id).subscribe(data => {
            resolve(<Platform>data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  insert(platform: Platform): Promise<Platform> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/platforms/insert', platform).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  update(platform: Platform): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/platforms/update', platform).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  delete(platform: Platform): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/platforms/delete', platform).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }

  getAllPlatforms() {
    return this.http.get('/api/platforms')
    .pipe(map(res => res.json()));
  }

  getPlatformById(id: number) {
    
  }
}
