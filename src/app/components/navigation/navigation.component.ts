import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OperatingSystem, Browser, LineOfService, Platform } from './../../../entity';
import { OperatingSystemsService, BrowsersService, LinesOfServiceService, PlatformsService, AuthService } from './../../services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  platforms: Platform[] = [];
  private _selectedPlatforms: Platform[];
  set selectedPlatforms(value: Platform[]) {
    this._selectedPlatforms = value;
  }
  operatingSystems: OperatingSystem[] = [];
  selectedOperatingSystems: OperatingSystem[] = [];
  browsers: Browser[] = [];
  selectedBrowsers: Browser[] = [];
  linesOfService: LineOfService[] = [];
  selectedLinesOfService: LineOfService[] = [];

  dropdownSettings = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platformsService: PlatformsService,
    private operatingSystemsService: OperatingSystemsService,
    private browsersService: BrowsersService,
    private linesOfServiceService: LinesOfServiceService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    }
    this.load().then();
  }

  load() {
    return new Promise((resolve, reject) => {
      this.loadPlatforms();
      this.loadOperatingSystems();
      this.loadBrowsers();
      this.loadLinesOfServices();
      resolve();
    });
  }

  loadPlatforms() {
    return new Promise((resolve, reject) => {
      this.platformsService.getAll().then(platforms => {
        this.platforms = platforms;
        resolve();
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  loadOperatingSystems() {
    return new Promise((resolve, reject) => {
      this.operatingSystemsService.getAll().then(operatingSystems => {
        this.operatingSystems = operatingSystems;
        resolve();
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    });
  }

  loadBrowsers() {
    return new Promise((resolve, reject) => {
      this.browsersService.getAll().then(browsers => {
        this.browsers = browsers;
        resolve();
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  loadLinesOfServices() {
    return new Promise((resolve, reject) => {
      this.linesOfServiceService.getAll().then(linesOfService => {
        this.linesOfService = linesOfService;
        resolve();
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    return this.authService.signout();
  }
}
