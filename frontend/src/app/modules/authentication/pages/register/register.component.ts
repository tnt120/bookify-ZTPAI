import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.styles.scss']
})
export class RegisterComponent {
  hidePassword = true;

  toogleHide() {
    this.hidePassword = !this.hidePassword;
  }
}
