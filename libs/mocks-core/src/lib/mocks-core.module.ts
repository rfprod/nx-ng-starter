import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DummyComponent } from './ui/components/dummy.component.mock';

@NgModule({
  imports: [CommonModule],
  declarations: [DummyComponent],
})
export class MocksCoreModule {}
