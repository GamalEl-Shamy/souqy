import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() authType: string = ''
  isMobile: boolean = true;

  private authService = inject(AuthService)

  mobileToggle() {
    this.isMobile = !this.isMobile
  }

  logout() {
    this.authService.logout()
  }

}
