import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { Inject } from '@angular/core';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }
  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('Navigation started');
      });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Navigation completed');
      });
    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = 'Hilton Hotel';
    this.localStorage.setItem('name', 'Hilton Hotel');
  }
  // Component loaded dynamically
  // ngAfterViewInit(): void {
  //  const componentRef = this.vcr.createComponent(RoomsComponent);
  //  componentRef.instance.numberOfRooms = 50;
  // }
  // title = 'hotelinventoryapp';
  // role = 'Admin';
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
}
