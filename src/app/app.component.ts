import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Neo-Gaia';
	navLinks: any[];
	activeLinkIndex = -1;

	constructor(private router: Router) {
		this.navLinks = [
			{
				label: 'Objects',
				link: './objects',
				index: 0
			}, {
				label: 'Save / Load / Export',
				link: './save',
				index: 2
			}
		];
	}
	ngOnInit(): void {
		this.router.events.subscribe((res) => {
			this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
		});
	}
}