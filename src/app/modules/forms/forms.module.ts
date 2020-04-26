import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitValueInputComponent } from './components/unit-value-input/unit-value-input.component';
import { UnitPickerComponent } from './components/unit-picker/unit-picker.component';
import {FormsModule as CoreFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [UnitValueInputComponent, UnitPickerComponent],
  imports: [
    CommonModule,
    CoreFormsModule,
    MatChipsModule
  ],
  exports: [UnitValueInputComponent, UnitPickerComponent, CommonModule]
})
export class FormsModule { }
