import { Component } from '@angular/core';
import {NavComponent} from './subcomponents/nav/nav.component';
import {FooterComponent} from './subcomponents/footer/footer.component';


@Component({
  selector: 'app-root',
    template: `
                <nav-bar>Loading nav...</nav-bar>
                <router-outlet></router-outlet>`,
    styleUrls: ['../lib/dev/bootstrap/css/bootstrap.css',
                '../lib/dev/elegant-font/code/style.css',
                '../lib/dev/css/animate.css',
                '../lib/dev/css/magnific-popup.css',
                '../lib/dev/flexslider/flexslider.css',
                '../lib/dev/css/form-elements.css',
                '../lib/dev/css/style.css',
                '../lib/dev/css/media-queries.css']
})
export class AppComponent {
}
