import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataActionComponent } from './components/data-action/data-action.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
	declarations: [DataActionComponent],
	imports: [
		CommonModule,
		MatIconModule
	],
	exports: [DataActionComponent]
})
export class DataModule { }
