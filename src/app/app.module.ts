import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { FileIOModule } from './modules/file-io/file-io.module';
import { OrbitBuilderModule } from './modules/orbit-builder/orbit-builder.module';
import { WelcomeModule } from './modules/welcome/welcome.module';
import { FormsModule } from '@angular/forms';
import { ObjectEditorModule } from './modules/object-editor/object-editor.module';
import { DataModule } from './modules/data/data.module';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatTabsModule,
		FileIOModule,
		OrbitBuilderModule,
		ObjectEditorModule,
		WelcomeModule,
		FormsModule,
		DataModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
