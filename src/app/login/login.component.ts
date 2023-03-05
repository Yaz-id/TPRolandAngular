import { Component } from '@angular/core';
import { Login } from '../common/data/login';
import { LoginService } from '../common/service/login.service';
import { messageFromError } from '../common/util/utils';
import { firstValueFrom } from 'rxjs';
import { SessionService } from '../common/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']
})
export class LoginComponent {

  public login : Login = new Login();

  constructor(private _loginService : LoginService ,
              public sessionService : SessionService) { }

public message : string = "";

  public async onLogin(){
     this.message = "donnees saisies = " + JSON.stringify(this.login);

     try {
      this.sessionService.isConnected = false;
      let LoginResponse = await firstValueFrom(this._loginService.postLogin$(this.login));
      this.message = LoginResponse.message;
      this.sessionService.isConnected = LoginResponse.status;
      if (LoginResponse.status)
        this.sessionService.username = LoginResponse.username;
      else
        this.sessionService.username = "?";
    } catch (error) {
    this.message = messageFromError(<any> error , "echec login ");
    console.log("error:"+ this.message );
    this.sessionService.username = "?";
    }
  }
}


