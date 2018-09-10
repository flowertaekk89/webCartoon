import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-info-update-modal',
  templateUrl: './user-info-update-modal.component.html',
  styleUrls: ['./user-info-update-modal.component.scss']
})
export class UserInfoUpdateModalComponent implements OnInit {

  @Input() loginUser: {
    'id': string,
    'pw': string,
    'email': string,
    'userType': string
  }

  private isIdCorrect: boolean = false;
  private isPwCorrect: boolean = false;
  private isEmailCorrect: boolean = false;

  private id_err: string = '';
  private pw_err: string = '';
  private email_err: string = '';

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit() {
  }

  whenBtnClicked(){
    // PW チェック
    if(this.loginUser.pw.length > 2){
      this.isPwCorrect = true;
    } else {
      this.isPwCorrect = false;
      this.pw_err = '無効なPWです。確認してください。';
      return false;
    }// if

    // Email チェック
    var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email_regex.test(this.loginUser.email)){
      this.isEmailCorrect = true;
    } else {
      this.isEmailCorrect = false;
      this.email_err = '無効なメールです。確認してください。';
      return false;
    }//if

    // ユーザータイプチェック
    console.log(this.loginUser.userType);

    this.updateUserOnDB();
  }// whenBtnClicked

  updateUserOnDB(){
    var updateData = {
      'userid' : this.loginUser.id,
      'userpw' : this.loginUser.pw,
      'userEmail' : this.loginUser.email,
      'userType' : this.loginUser.userType
    }

    this.http.post('http://localhost:3000/updateUser', updateData)
      .subscribe(
        (res) => {
          if(res){
            alert('更新成功！');
          } else {
            alert('更新失敗！');
          }// if
        },
        err => {
          console.log(err);
        }
      ); //subscribe
  }// updateUserOnDB

}
