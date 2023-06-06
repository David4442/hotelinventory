import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  ngOnDestroy(): void {
    console.log('on destroy is called');
  }

  //Only works when u have INPUT properties, and that input properties can get updated or new value
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  @Input() title: string = '';
  @Input() rooms: RoomList[] = [];
  @Input() price: any = 0;
  @Output() selectedRoom = new EventEmitter<RoomList>();

  ngOnInit(): void {}

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }
}
