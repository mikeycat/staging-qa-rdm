import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { NgProgressModule } from 'ngx-progressbar';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSelectModule, MatStepperModule, MatSnackBarModule, MatDialogModule, MatButtonModule, MatInputModule, MatSidenavModule, MatIconModule, MatFormFieldModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { ModalDialogModule } from 'ngx-modal-dialog';

import { UserGuard } from './gaurds/user.gaurd';
import { AdminGuard } from './gaurds/admin.gaurd';

const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
  { path: 'dashboard', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'profile', component: ProfilePageComponent, canActivate: [UserGuard] },
  { path: 'test-cases', component: TestCasesPage, canActivate: [UserGuard] },
  { path: 'admin-panel', redirectTo: 'admin-panel/select', canActivate: [AdminGuard] },
  { path: 'admin-panel/:focus', component: AdminPanelComponent, canActivate: [AdminGuard] },
];

import {
  ActiveTestCasesModal,ActiveTestsTable,ActiveTestsPage,
  AdminPanelComponent,
  BrowsersModal,BrowsersTable,BrowsersPage,
  CastSenderComponent,
  DoughnutChart,
  DashboardComponent, DashboardQueueComponent, DashboardDoughnuts,
  LandingPageComponent,
  LinesOfServiceModal,LinesOfServiceTable,LinesOfServicePage,
  LoginPageComponent,
  NavigationComponent,
  OperatingSystemsModal,OperatingSystemsTable,OperatingSystemsPage,
  PlatformsTable,PlatformsPage,PlatformsModal,
  ProfilePageComponent,
  ResultsModal,ResultsTable,ResultsPage,
  SessionsModal,SessionsTable,SessionsPage,
  TestCasesModal,TestCasesTable,TestCasesPage,
  TestSuitesModal,TestSuitesTable,TestSuitesPage, DashboardLine, LineChart, RegisterPageComponent,
} from './components';

import {
  AuthService,
  BrowsersService,
  OperatingSystemsService,
  PlatformsService,
  TestCasesService,
  ResultsService,
  ActiveTestCasesService,
  LinesOfServiceService,
  TestSuitesService
} from './services';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    CastSenderComponent
  ],
  entryComponents: [
    ActiveTestCasesModal,
    BrowsersModal,
    LinesOfServiceModal,
    OperatingSystemsModal,
    PlatformsModal,
    ResultsModal,
    SessionsModal,
    TestCasesModal,
    TestSuitesModal
  ],
  declarations: [
    AppComponent,
    ActiveTestsTable,ActiveTestsPage,ActiveTestCasesModal,
    AdminPanelComponent,
    BrowsersTable,BrowsersPage,BrowsersModal,
    CastSenderComponent,
    DoughnutChart, LineChart,
    DashboardComponent, DashboardLine, DashboardQueueComponent, DashboardDoughnuts,
    LandingPageComponent,
    LinesOfServiceTable,LinesOfServicePage,LinesOfServiceModal,
    LoginPageComponent,
    NavigationComponent,
    OperatingSystemsTable,OperatingSystemsPage,OperatingSystemsModal,
    PlatformsTable,PlatformsPage,PlatformsModal,
    ProfilePageComponent,
    RegisterPageComponent,
    ResultsTable,ResultsPage,ResultsModal,
    SessionsTable,SessionsPage,SessionsModal,
    TestCasesTable,TestCasesPage,TestCasesModal,
    TestSuitesTable,TestSuitesPage,TestSuitesModal
  ],
  imports: [
    BrowserModule,
    ModalDialogModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    LayoutModule,
    NgProgressModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpModule
  ],
  providers: [
    CookieService,
    BrowsersService,
    OperatingSystemsService,
    PlatformsService,
    ResultsService,
    LinesOfServiceService,
    TestCasesService,
    ActiveTestCasesService,
    TestSuitesService,
    AuthService,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
