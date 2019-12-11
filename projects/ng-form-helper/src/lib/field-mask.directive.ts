import { Directive, ElementRef, forwardRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldDirective } from './form-field.directive';

@Directive({
  selector: '[formFieldMask][ngModel], [formFieldMask][formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldMaskDirective),
      multi: true
    }
  ]
})
export class FieldMaskDirective extends FormFieldDirective implements OnInit {

  /**
   * The mask can't contain numbers
   */
  private readonly MASK_SHOULD_NOT_HAVE_NUMBERS = /[0-8]/gi;
  private readonly MASK_MUST_FINISH_WITH_A_NUMBER = /\d$/;

  private generatedMaskConfig: {
    [maxLength: number]: {
      valueStructure: RegExp;
      maskStructure: string;
    }
  } = {};


  @Input('formFieldMask')
  set setFormFieldMask(formFieldMask: string) {
    this.generatedMaskConfig = this.generateMaskConfig(formFieldMask);
  }

  constructor(
    protected element: ElementRef,
    protected renderer: Renderer2
  ) {
    super();
  }

  private generateMaskConfig(formFieldMask: string): {
    [maxLength: number]: {
      valueStructure: RegExp;
      maskStructure: string;
    }
  } {
    if (this.MASK_SHOULD_NOT_HAVE_NUMBERS.test(formFieldMask)) {
      throw new Error(
        `Can't generate mask: "${formFieldMask}". Invalid charactere found.
        You should not use numeric character to compose the field mask.`
      );
    }

    if (!this.MASK_MUST_FINISH_WITH_A_NUMBER.test(formFieldMask)) {
      throw new Error(
        `Can't generate mask: "${formFieldMask}". Invalid format found.
        The mask must finish with a numeric character (9).`
      );
    }

    const generatedMaskConfig: {
      [maxLength: string]: {
        valueStructure: RegExp;
        maskStructure: string;
      }
    } = {};

    const decomposeGivenMask = formFieldMask.match(/(9+|[^9]+)/g);
    const isNumeric = /^\d+$/;
    let composeMask = '';
    let numberMapper = '';
    let numberGroup = 1;
    let numericLength = 0;

    decomposeGivenMask.forEach(textGroup => {
      if (isNumeric.test(textGroup)) {
        numericLength += textGroup.length;
        composeMask += `\$${numberGroup++}`;
        const currentNumberMapper = `${numberMapper}([0-9]{1,${textGroup.length}})`;
        numberMapper += `([0-9]{${textGroup.length}})`;

        generatedMaskConfig[String(numericLength)] = {
          valueStructure: new RegExp(currentNumberMapper, 'g'),
          maskStructure: composeMask
        };
        return;
      }

      composeMask += textGroup;
    });

    return generatedMaskConfig;
  }

  private getPartialMask(currentValue: string): {
    valueStructure: RegExp;
    maskStructure: string;
    maxLength: number;
  } {
    const lengths = Object.keys(this.generatedMaskConfig);
    let length = lengths.find(maxLength => currentValue.length <= Number(maxLength));
    length = length || lengths.pop();
    const maskConfig = this.generatedMaskConfig[length];

    return {
      valueStructure: maskConfig.valueStructure,
      maskStructure: maskConfig.maskStructure,
      maxLength: Number(length)
    };
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const currentMaskedValue = this.getValueFromKeyboardEvent(event);
    const currentValue = currentMaskedValue.replace(/[^0-9]/g, '');
    const maskConfig = this.getPartialMask(currentValue);

    if (currentValue.length > maskConfig.maxLength) {
      this.resetField();
      return;
    }

    const maskedValue = currentValue.replace(maskConfig.valueStructure, maskConfig.maskStructure);
    this.updateFieldValue(maskedValue);
  }
}
