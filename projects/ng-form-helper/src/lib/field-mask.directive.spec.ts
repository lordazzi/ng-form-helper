import { ElementRef, Renderer2 } from '@angular/core';
import { FieldMaskDirective } from './field-mask.directive';

interface FieldMaskDirectiveMock {
  readonly MASK_SHOULD_NOT_HAVE_NUMBERS: RegExp;
  readonly MASK_MUST_FINISH_WITH_A_NUMBER: RegExp;

  setFormFieldMask: string;

  generatedMaskConfig: {
    [maxLength: number]: {
      valueStructure: RegExp;
      maskStructure: string;
    }
  };

  element: ElementRef;
  renderer: Renderer2;

  generateMaskConfig(formFieldMask: string): {
    [maxLength: number]: {
      valueStructure: RegExp;
      maskStructure: string;
    }
  };

  getPartialMask(currentValue: string): {
    valueStructure: RegExp;
    maskStructure: string;
    maxLength: number;
  };

  onInput(event: KeyboardEvent): void;
}

describe('[FieldMaskDirective]', () => {

  function getAInstance(): FieldMaskDirectiveMock {
    const elementRefLike: any = {
      nativeElement: document.createElement('input')
    };

    const renderer: any = {
      setProperty: (el: HTMLInputElement, attr: string, value: string) => {
        (el as any)[attr] = value;
      }
    };

    return new FieldMaskDirective(elementRefLike, renderer) as any as FieldMaskDirectiveMock;
  }

  function createKeyBoardEvent(
    value: string, formMaskDirective: FieldMaskDirectiveMock
  ): KeyboardEvent {
    const target = formMaskDirective.element.nativeElement;
    target.value = value;

    const event: any = { target };

    return event;
  }

  it('criar instância', () => {
    expect(getAInstance()).toBeTruthy();
  });

  it('[generateMaskConfig] criação de estruturas de mascara para (99) 9999-9999', () => {
    const instance = getAInstance();
    const generatedMaskConfig = instance.generateMaskConfig('(99) 9999-9999');

    expect(Object.keys(generatedMaskConfig)).toEqual(['2', '6', '10']);

    expect(generatedMaskConfig[2].maskStructure).toEqual('(\$1');
    expect(String(generatedMaskConfig[2].valueStructure)).toEqual(String(/([0-9]{1,2})/g));

    expect(generatedMaskConfig[6].maskStructure).toEqual('(\$1) \$2');
    expect(String(generatedMaskConfig[6].valueStructure)).toEqual(String(/([0-9]{2})([0-9]{1,4})/g));

    expect(generatedMaskConfig[10].maskStructure).toEqual('(\$1) \$2-\$3');
    expect(String(generatedMaskConfig[10].valueStructure)).toEqual(String(/([0-9]{2})([0-9]{4})([0-9]{1,4})/g));
  });

  it('[getPartialMask] coleta de mascaras parciais para (99) 9999-9999', () => {
    const instance = getAInstance();
    instance.setFormFieldMask = '(99) 9999-9999';

    let partialMask = instance.getPartialMask('');
    expect(partialMask.maskStructure).toBe('(\$1');
    expect(String(partialMask.valueStructure)).toBe(String(/([0-9]{1,2})/g));
    expect(partialMask.maxLength).toBe(2);

    partialMask = instance.getPartialMask('11');
    expect(partialMask.maskStructure).toBe('(\$1');
    expect(String(partialMask.valueStructure)).toBe(String(/([0-9]{1,2})/g));
    expect(partialMask.maxLength).toBe(2);

    partialMask = instance.getPartialMask('119');
    expect(partialMask.maskStructure).toBe('(\$1) \$2');
    expect(String(partialMask.valueStructure)).toBe(String(/([0-9]{2})([0-9]{1,4})/g));
    expect(partialMask.maxLength).toBe(6);

    partialMask = instance.getPartialMask('119998');
    expect(partialMask.maskStructure).toBe('(\$1) \$2');
    expect(String(partialMask.valueStructure)).toBe(String(/([0-9]{2})([0-9]{1,4})/g));
    expect(partialMask.maxLength).toBe(6);

    partialMask = instance.getPartialMask('11999877');
    expect(partialMask.maskStructure).toBe('(\$1) \$2-\$3');
    expect(String(partialMask.valueStructure)).toBe(String(/([0-9]{2})([0-9]{4})([0-9]{1,4})/g));
    expect(partialMask.maxLength).toBe(10);
  });

  it('[onInput] aplicando mascara sobre valor, considerando a mascara (99) 9999-9999', () => {
    const instance = getAInstance();
    instance.setFormFieldMask = '(99) 9999-9999';

    instance.onInput(createKeyBoardEvent('', instance));
    let result = instance.element.nativeElement.value;
    expect(result).toBe('');

    instance.onInput(createKeyBoardEvent('1', instance));
    result = instance.element.nativeElement.value;
    expect(result).toBe('(1');

    instance.onInput(createKeyBoardEvent('(1', instance));
    result = instance.element.nativeElement.value;
    expect(result).toBe('(1');

    instance.onInput(createKeyBoardEvent('11', instance));
    result = instance.element.nativeElement.value;
    expect(result).toBe('(11');

    instance.onInput(createKeyBoardEvent('(11)9', instance));
    result = instance.element.nativeElement.value;
    expect(result).toBe('(11) 9');

    instance.onInput(createKeyBoardEvent('(11) 977', instance));
    result = instance.element.nativeElement.value;
    expect(result).toBe('(11) 977');

    instance.onInput(createKeyBoardEvent('119777', instance));
    result = instance.element.nativeElement.value;
    expect(result).toBe('(11) 9777');

    instance.onInput(createKeyBoardEvent('1197778888', instance));
    result = instance.element.nativeElement.value;
    expect(result).toBe('(11) 9777-8888');
  });
});
