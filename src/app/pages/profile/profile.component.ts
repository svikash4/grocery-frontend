import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
    }
  }
}
