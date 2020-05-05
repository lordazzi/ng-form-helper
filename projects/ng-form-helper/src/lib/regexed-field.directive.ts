import { Directive, ElementRef, forwardRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldDirective } from './form-field.directive';

@Directive({
  selector: '[formRegexedField]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RegexedFieldDirective),
      multi: true
    }
  ]
})
export class RegexedFieldDirective extends FormFieldDirective {

  @Input('formRegexedField')
  set setRegex(regex: string) {
    this.regexRule = new RegExp(regex);
  }

  private regexRule = /(?:)/;

  constructor(
    protected element: ElementRef,
    protected renderer: Renderer2
  ) {
    super();
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const value = this.getValueFromKeyboardEvent(event);

    if (this.regexRule.test(value)) {
      const cursorInitialPosition = this.element.nativeElement.selectionStart;
      this.updateFieldValue(value);
      this.setCursorPosition(cursorInitialPosition);
      return;
    }

    this.resetField();
  }
}
