import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintUserstoryComponent } from './sprint-userstory.component';

describe('SprintUserstoryComponent', () => {
  let component: SprintUserstoryComponent;
  let fixture: ComponentFixture<SprintUserstoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintUserstoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintUserstoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
