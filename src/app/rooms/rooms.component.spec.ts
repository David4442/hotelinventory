import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RoomsComponent } from './rooms.component';
import { ConfigService } from '../services/config.service';
import { RoomsService } from './services/rooms.service';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { RouteConfigToken } from '../services/routeConfig.service';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [RoomsComponent],
      providers: [
        RoomsService,
        ConfigService,
        {
          provide: APP_SERVICE_CONFIG,
          useValue: { apiEndpoint: 'http://localhost:3000' },
        },
        {
          provide: RouteConfigToken,
          useValue: { title: 'rooms' },
        },
      ],
    });
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle', () => {
    component.hideRooms = false;
    component.toggle();
    expect(component.hideRooms).toBe(true);
  });
});
