import { TestBed, async, inject } from '@angular/core/testing';

import { PersonalGuard } from './personal.guard';

describe('PersonalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalGuard]
    });
  });

  it('should ...', inject([PersonalGuard], (guard: PersonalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
