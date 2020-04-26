import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarEditorComponent } from './components/star-editor/star-editor.component';
import { PlanetEditorComponent } from './components/planet-editor/planet-editor.component';
import { ObjectEditorComponent } from './components/object-editor/object-editor.component';
import { FormsModule as CoreFormsModule } from '@angular/forms';
import { FormsModule } from '../forms/forms.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
	declarations: [StarEditorComponent, PlanetEditorComponent, ObjectEditorComponent],
	imports: [
		CommonModule,
		CoreFormsModule,
		MatSidenavModule,
		MatListModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule
	]
})
export class ObjectEditorModule { }
