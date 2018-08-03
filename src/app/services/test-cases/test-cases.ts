import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TestCase, TestSuite } from './../../../entity';

@Injectable()
export class TestCasesService {

  constructor(private http: Http) { }

  getAll(): Promise<TestCase[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/test-cases').subscribe(data => {
          resolve(<TestCase[]>data.json());
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  getAllGroupByTestSuite(): Promise<TestCase[]> {
    return new Promise((resolve, reject) => {
      this.http.get('/api/test-cases/group/test-suite').subscribe(data => {
        resolve(<TestCase[]>data.json());
      });
    });
  }
  getAllByTestSuite(testSuite: TestSuite): Promise<TestCase[]> {
    return new Promise((resolve, reject) => {
      this.http.get('/api/test-cases/test-suite/' + testSuite.id).subscribe(data => {
        resolve(<TestCase[]>data.json());
      });
    });
  }
  getAllTotals(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/test-cases/totals').subscribe(data => {
          resolve(data.json());
        });
      } catch (err) {
        console.log(err);
        reject(err);
      }
    })
  }
  getById(id: number): Promise<TestCase> {
      return new Promise((resolve, reject) => {
        try {
          this.http.get('/api/test-cases/' + id).subscribe(data => {
            resolve(<TestCase>data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  getTotalsByTestSuite(testSuite: TestSuite): Promise<TestCase> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/test-cases/test-suite/' + testSuite.id + '/totals').subscribe(data => {
          resolve(<TestCase>data.json());
        })
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  getTotalsByTestSuiteGroupByDate(testSuite: TestSuite): Promise<TestCase[]> {
    return new Promise((resolve, reject) => {
      try {
        this.http.get('/api/test-cases/test-suite/' + testSuite.id + '/date').subscribe(data => {
          resolve(<TestCase[]>data.json());
        })
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  insert(testCase: TestCase): Promise<TestCase> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/test-cases/insert', testCase).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  update(testCase: TestCase): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/test-cases/update', testCase).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
  delete(testCase: TestCase): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.http.post('/api/test-cases/delete', testCase).subscribe(data => {
            resolve(data.json());
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      });
  }
}
