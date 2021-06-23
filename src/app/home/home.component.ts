import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
