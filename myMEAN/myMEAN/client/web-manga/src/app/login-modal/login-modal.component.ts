import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  private login_userId: string = '';
  private login_userPw: string = '';

  private isIdCorrect: boolean = false;
  private isPwCorrect: boolean = false;
  @Output() loginResult = new EventEmitter();

  private id_err: string = '';
  private pw_err: string = '';

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

  onSubmit(){
    this.idAndPasswordValidation();
  }// onSubmit

  idAndPasswordValidation(){
    //ID チェック
    if(this.login_userId.length > 2){
      this.isIdCorrect = true;
    } else {
      this.isIdCorrect = false;
      this.id_err = '無効なIDです。五文字以上入力してください。';
      return;
    }// if

    // PW チェック
    if(this.login_userPw.length > 2){
      this.isPwCorrect = true;
    } else {
      this.isPwCorrect = false;
      this.pw_err = '無効なPWです。確認してください。';
      return;
    }// if

    this.loginCheck();
  }// idAndPasswordValidation

  loginCheck(){
    var data_json = {
      'id': this.login_userId,
      'pw': this.login_userPw
    };

    this.http.post('http://localhost:3000/login', data_json)
      .subscribe(
        (data)=> {
          if(data){
            this.loginResult.emit(data);
          } else {
            alert('ログイン失敗');
            this.loginResult.emit(false);
          }// if
          this.initField();
        },
        err => {console.log(err)}
      );
  }//loginCheck

  initField(){
    this.login_userId = '';
    this.login_userPw = '';
  }// initField

}
