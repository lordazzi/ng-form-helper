import { NgModule } from '@angular/core';
import { FieldMaskDirective } from './field-mask.directive';
import { InputRegexDirective } from './input-regex.directive';

@NgModule({
  declarations: [
    FieldMaskDirective,
    InputRegexDirective
  ],
  exports: [
    FieldMaskDirective,
    InputRegexDirective
  ]
})
export class FormHelperModule { }
