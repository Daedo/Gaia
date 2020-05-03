import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeMainComponent } from './modules/welcome/components/welcome-main/welcome-main.component';

import { FileIOMainComponent } from './modules/file-io/components/file-io-main/file-io-main.component';
import { ObjectEditorComponent } from './modules/object-editor/components/object-editor/object-editor.component';


const routes: Routes = [
	{ path: '', redirectTo: '/welcome', pathMatch: 'full' },
	{ path: 'welcome', component: WelcomeMainComponent },
	{ path: 'objects', component: ObjectEditorComponent },
	{ path: 'save', component: FileIOMainComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
