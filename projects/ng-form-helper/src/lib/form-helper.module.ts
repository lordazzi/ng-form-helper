import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldMaskDirective } from './field-mask.directive';
import { InputRegexDirective } from './input-regex.directive';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    FieldMaskDirective,
    InputRegexDirective
  ],
  exports: [
    FieldMaskDirective,
    InputRegexDirective,
    FormsModule
  ]
})
export class FormHelperModule { }
