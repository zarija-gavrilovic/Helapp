import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogInfoPage } from './log-info.page';

describe('LogInfoPage', () => {
  let component: LogInfoPage;
  let fixture: ComponentFixture<LogInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
