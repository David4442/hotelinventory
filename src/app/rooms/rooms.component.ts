import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked
{
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = true;
  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };
  title = 'Room List';
  roomList: RoomList[] = [];
  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });
  totalBytes = 0;

  subscription!: Subscription;
  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );
  
  priceFilter = new FormControl(0);
  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms)=> rooms.length)
  )

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor(@SkipSelf() private roomsService: RoomsService,private configService : ConfigService) {}

  ngAfterViewChecked(): void {}
  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';
    this.headerChildrenComponent.last.title = 'last title';
  }
  // To detect some changes that are not controlled
  ngDoCheck(): void {
    console.log('on changes is called');
  }

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made !');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request sucess!');
          break;
        }
        case HttpEventType.DownloadProgress:
          {
            this.totalBytes += event.loaded;
          }
          break;
        case HttpEventType.Response:
          {
            console.log(event.body);
          }
          break;
      }
    });
    this.stream.subscribe((data) => console.log(data));
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });

    // this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
    // console.log(this.headerComponent);
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Private Suite',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 8000,
      photos:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 2.1,
    };
    //MUTABLE
    // this.roomList.push(room);

    //IMMUTABLE
    //When addding new record, instead of modifying existing roomList, create new instance of roomList and return that new instance.
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }
  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Private Suite',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.5,
    };
    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe;
    }
  }
}
