import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KuldetesList } from './kuldetes-list';

describe('KuldetesList', () => {
  let component: KuldetesList;
  let fixture: ComponentFixture<KuldetesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KuldetesList],
    }).compileComponents();

    fixture = TestBed.createComponent(KuldetesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
