import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldMaskDirective } from './field-mask.directive';
import { RegexedFieldDirective } from './regexed-field.directive';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    FieldMaskDirective,
    RegexedFieldDirective
  ],
  exports: [
    FieldMaskDirective,
    RegexedFieldDirective
  ]
})
export class FormHelperModule { }
