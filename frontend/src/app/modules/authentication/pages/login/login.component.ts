import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.styles.scss']
})
export class LoginComponent {
  hidePassword = true;

  toogleHide() {
    this.hidePassword = !this.hidePassword;
  }
}
