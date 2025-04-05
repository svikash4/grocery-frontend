import { Component } from '@angular/core';

@Component({
  selector: 'app-root',   // 👈 This must match index.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grocery-frontend';
}
