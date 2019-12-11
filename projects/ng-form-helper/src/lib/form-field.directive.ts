import { ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export abstract class FormFieldDirective implements OnInit, ControlValueAccessor {

  protected abstract element: ElementRef;
  protected abstract renderer: Renderer2;

  protected oldState: { cursorStart: number; cursorEnd: number; value: string } = {
    cursorStart: 0,
    cursorEnd: 0,
    value: ''
  };

  //  These are for angular use
  // tslint:disable-next-line:variable-name
  protected _onChange = (...arg: any[]) => void (0);
  // tslint:disable-next-line:variable-name
  protected _onTouch = () => void (0);

  ngOnInit(): void {
    this.oldState.value = this.element.nativeElement.value;
  }

  @HostListener('keydown')
  onKeyDown(): void {
    this.oldState.cursorStart = this.element.nativeElement.selectionStart;
    this.oldState.cursorEnd = this.element.nativeElement.selectionEnd;
  }

  @HostListener('blur')
  onBlur(): void {
    this._onTouch();
  }

  writeValue(value: string): void {
    const normalizedValue = value == null ? '' : value;
    this.oldState.value = normalizedValue;
    this.renderer.setProperty(this.element.nativeElement, 'value', normalizedValue);
  }

  protected getValueFromKeyboardEvent(event: KeyboardEvent): string {
    const el = event.target && event.target as HTMLInputElement || null;
    return el && el.value || '';
  }

  protected setCursorPosition(start: number, end = start): void {
    this.element.nativeElement.selectionStart = start;
    this.element.nativeElement.selectionEnd = end;
  }

  resetField(): void {
    this._onChange(this.oldState.value);
    this.writeValue(this.oldState.value);
    this.setCursorPosition(this.oldState.cursorStart, this.oldState.cursorEnd);
  }

  updateFieldValue(value: string): void {
    this._onChange(value);
    this.writeValue(value);
    this.oldState.value = value;
  }

  registerOnChange(fn: (...arg: any[]) => undefined): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => undefined): void {
    this._onTouch = fn;
  }
}
