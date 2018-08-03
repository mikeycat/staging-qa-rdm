import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActiveTest } from '../../../entity/';

@Injectable()
export class ActiveTestCasesService {

    constructor(private http: Http) { }

    getAll(): Promise<ActiveTest[]> {
        return new Promise((resolve, reject) => {
            try {
                this.http.get('/api/active-tests').subscribe(data => {
                resolve(<ActiveTest[]>data.json());
                });
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
    getById(id: number): Promise<ActiveTest> {
        return new Promise((resolve, reject) => {
        try {
            this.http.get('/api/active-tests/' + id).subscribe(data => {
            resolve(<ActiveTest>data.json());
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
        });
    }
    insert(activeTest: ActiveTest): Promise<number> {
        return new Promise((resolve, reject) => {
        try {
            this.http.post('/api/active-tests/insert', activeTest).subscribe(data => {
            resolve(data.json());
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
        });
    }
    update(activeTest: ActiveTest): Promise<boolean> {
        return new Promise((resolve, reject) => {
        try {
            this.http.post('/api/active-tests/update', activeTest).subscribe(data => {
            resolve(data.json());
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
        });
    }
    delete(activeTest: ActiveTest): Promise<boolean> {
        return new Promise((resolve, reject) => {
        try {
            this.http.post('/api/active-tests/delete', activeTest).subscribe(data => {
            resolve(data.json());
            });
        } catch (err) {
            console.log(err);
            reject(err);
        }
        });
    }
}