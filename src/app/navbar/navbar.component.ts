import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

   constructor(private router: Router, public auth: AuthService) {
  }

  userDetails: any;

  ngOnInit() {
    this.userDetails = JSON.parse(sessionStorage.getItem('firebase'));
  }

  goToAddProjectsPage() {
    this.router.navigate(['/add']);
  }


}
