import { Component, Input, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Social } from 'src/app/core/models/social.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit{
  @Input() isLoggedIn: boolean = true;
  @Input() socials!:Social[];
 
  firtsLetterUsername!:String;

  public isInDashboard$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isMenuCollapsed = true;
  collapsed = true;

  constructor(
    private authService: AuthService,
    private router: Router) {
      this.router.events.subscribe((e: Event) => {
        if (e instanceof NavigationEnd) {
          (/(profile)/).test(e.url) && this.isInDashboard$.next(true)
          !(/(profile)/).test(e.url) && this.isInDashboard$.next(false)
        }
      });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.firtsLetterUsername = this.authService.getUsername().substring(0, 1).toUpperCase();
    }
  }

  logout() {
    this.authService.logout();
      this.isLoggedIn = false;
      this.isMenuCollapsed = true;
  }
}