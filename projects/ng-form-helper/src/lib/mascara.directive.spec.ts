
// @Component({
//   template: `
//     <form #form="ngForm">
//         <input
//           type="text"
//           id="cpf"
//           name="cpf"
//           [(ngModel)]="cpf"
//           pdvMascara="000.000.000-00">
//     </form>
//   `
// })
// class TestComponent {
//   @ViewChild('form')
//   form: NgForm;

//   cpf: string;
// }

describe('directive: MascaraDirective', () => {

  // let component: TestComponent;
  // let fixture: ComponentFixture<TestComponent>;
  // let de: DebugElement;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [FormsModule],
  //     declarations: [TestComponent, MascaraDirective]
  //   }).compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TestComponent);
  //   component = fixture.componentInstance;
  //   de = fixture.debugElement.query(By.directive(MascaraDirective));

  //   fixture.detectChanges();
  // });

  // afterEach(() => {
  //   fixture.destroy();
  // });

  // it('componente deve ter a instancia criada', () => {
  //   expect(component).toBeTruthy();
  //   expect(de).toBeTruthy();
  // });

  // it('elemento html deve estar com mascara e o model não', async(() => {
  //   component.cpf = '62111367656';
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     expect(de).toBeTruthy();
  //     expect(de.nativeElement.value).toBe('621.113.676-56');
  //     expect(component.cpf).toBe('62111367656');
  //   });
  // }));

});
