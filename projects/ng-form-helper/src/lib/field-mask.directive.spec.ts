import { FieldMaskDirective } from './field-mask.directive';

interface FieldMaskDirectiveMock {
  CARACTERES_ESPECIAIS: string[];
  AVAILABLE_MASKCHAR: {
    [char: string]: RegExp | undefined
  };
  maskConfig?: string;
  _onChange: (_: any) => void;
  _onTouch: () => void;
  applyMask(inputValor: string, mascaraExpressao: string | undefined): string;
}

describe('[FieldMaskDirective]', () => {

  function getAInstance(): FieldMaskDirectiveMock {
    const elementRefLike: any = {
      nativeElement: document.createElement('input')
    };

    return new FieldMaskDirective(elementRefLike, {} as any) as any as FieldMaskDirectiveMock;
  }

  it('criar instância', () => {
    expect(getAInstance()).toBeTruthy();
  });

  it('fluxos de ACEITAÇÃO de mascara de telefone simples (99) 9999-9999', () => {
    const instance = getAInstance();
    instance.maskConfig = '(99) 9999-9999';
    let result = instance.applyMask('1', instance.maskConfig);
    expect(result).toBe('(1');

    result = instance.applyMask('(11', instance.maskConfig);
    expect(result).toBe('(11) ');

    result = instance.applyMask('11', instance.maskConfig);
    expect(result).toBe('(11) ');

    result = instance.applyMask('(11)9', instance.maskConfig);
    expect(result).toBe('(11) 9');

    result = instance.applyMask('(11) 977', instance.maskConfig);
    expect(result).toBe('(11) 977');

    result = instance.applyMask('119777', instance.maskConfig);
    expect(result).toBe('(11) 9777-');

    result = instance.applyMask('1197778888', instance.maskConfig);
    expect(result).toBe('(11) 9777-8888');
  });

  it('fluxos de REJEIÇÃO de mascara de telefone simples (99) 9999-9999', () => {
    const instance = getAInstance();
    instance.maskConfig = '(99) 9999-9999';
    let result = instance.applyMask('A', instance.maskConfig);
    expect(result).toBe('');

    result = instance.applyMask('(11', instance.maskConfig);
    expect(result).toBe('(11) ');

    result = instance.applyMask('11', instance.maskConfig);
    expect(result).toBe('(11) ');

    result = instance.applyMask('(11)9', instance.maskConfig);
    expect(result).toBe('(11) 9');

    result = instance.applyMask('(11) 977', instance.maskConfig);
    expect(result).toBe('(11) 977');

    result = instance.applyMask('119777', instance.maskConfig);
    expect(result).toBe('(11) 9777-');

    result = instance.applyMask('1197778888', instance.maskConfig);
    expect(result).toBe('(11) 9777-8888');
  });

  it('criar instância', () => {
    const instance = getAInstance();
    instance.maskConfig = '999A999';
    let result = instance.applyMask('', instance.maskConfig);
    expect(result).toBe();
  });

  it('criar instância', () => {
    const instance = getAInstance();
    instance.maskConfig = '999.999.999-99';
    let result = instance.applyMask('', instance.maskConfig);
    expect(result).toBe();
  });

  it('criar instância', () => {
    const instance = getAInstance();
    instance.maskConfig = '99.999.999/9999-99';
    let result = instance.applyMask('', instance.maskConfig);
    expect(result).toBe();
  });
});
