import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService,

    private router: Router
  ) { }
  public isLoggedIn: boolean = false;
  navigate() {
    this.router.navigate(['newblog']); // Navigate to the specified route (e.g., home)
  }

  ngOnInit() {
    this.auth.responseStatus$.subscribe(
      {
        next: (status) => {
          if (status === 204) {
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
        }
      }
    )
  }
}
