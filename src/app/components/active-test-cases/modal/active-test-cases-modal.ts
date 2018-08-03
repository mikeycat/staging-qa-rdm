import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Component, ComponentRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ActiveTestCasesService } from './../../../services';
import { ActiveTest } from './../../../../entity';

@Component({
    selector: 'active-tests-modal',
    templateUrl: './active-test-cases-modal.html'
})
export class ActiveTestCasesModal {

    activeTestCase: ActiveTest;

    closeSubject:Subject<any>;
    private emitter: EventEmitter<boolean>;

    constructor(private activeTestCasesService: ActiveTestCasesService) {}

    dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {
        this.closeSubject = options.closeDialogSubject;
        if (options.data instanceof Array) {
          this.emitter = options.data[0];
    
          if (options.data[1]) {
            this.activeTestCase = options.data[1];
          }
        } else {
          this.emitter = options.data;
        }
    }

    reset() {
        if (this.activeTestCase.id == null) {
            this.activeTestCase.hash = null;
            this.activeTestCase.test_case = null;
        } else {
            this.activeTestCasesService.getById(this.activeTestCase.id).then((activeTest: ActiveTest) => {
                this.activeTestCase = activeTest;
            }).catch(err => {
                console.log(err);
            });
        }
    }

    save() {
        if (this.activeTestCase.id == null) {
            this.activeTestCasesService.insert(this.activeTestCase).then(result => {
                if (result) {
                    this.emitter.emit();
                    this.closeSubject.next(result);
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.activeTestCasesService.update(this.activeTestCase).then(result => {
                if (result) {
                    this.emitter.emit();
                    this.closeSubject.next(result);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }   
}