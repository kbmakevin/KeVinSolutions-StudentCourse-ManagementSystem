import { TestBed, async, inject } from '@angular/core/testing';

import { StudentRestrictionGuard } from './student-restriction.guard';

describe('StudentRestrictionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentRestrictionGuard]
    });
  });

  it('should ...', inject([StudentRestrictionGuard], (guard: StudentRestrictionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
