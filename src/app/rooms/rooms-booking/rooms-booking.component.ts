import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}
  id: number = 0;
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));

  ngOnInit(): void {
    // this.id = this.router.snapshot.params['roomid']; THE VALUE WILL NEVER BE UPDATED
    // this.router.paramMap.subscribe((params) => {
    //   params.get('roomid');
    // });
    // this.id$ = this.router.params.pipe(map((params) => params['roomid']));
  }
}
