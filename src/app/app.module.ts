import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormHelperModule } from 'projects/ng-form-helper/src/public-api';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormHelperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
