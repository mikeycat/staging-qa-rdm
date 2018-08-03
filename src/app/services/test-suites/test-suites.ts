import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TestSuite } from './../../../entity';

@Injectable()
export class TestSuitesService {

  constructor(private http: Http) { }

  getAll(): Promise<TestSuite[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/test-suites').subscribe(data => {
          resolve(<TestSuite[]>data.json());
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  getById(id: number): Promise<TestSuite> {
      return new Promise((resolve, reject) => {
        try {
          this.http.get('/api/test-suites/' + id).subscribe(data => {
            resolve(<TestSuite>data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  insert(testSuite: TestSuite): Promise<TestSuite> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/test-suites/insert', testSuite).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  update(testSuite: TestSuite): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/test-suites/update', testSuite).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  delete(testSuite: TestSuite): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/test-suites/delete', testSuite).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
}
