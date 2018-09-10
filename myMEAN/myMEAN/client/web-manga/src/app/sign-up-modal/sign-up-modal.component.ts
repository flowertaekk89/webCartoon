import { Component, OnInit, Input} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss']
})
export class SignUpModalComponent implements OnInit {

  private userId: string = '';
  private userPw: string = '';
  private userEmail: string = '';
  private userType: string = 'normalUser';

  private isIdCorrect: boolean = false;
  private isPwCorrect: boolean = false;
  private isEmailCorrect: boolean = false;

  private id_err: string = '';
  private pw_err: string = '';
  private email_err: string = '';

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }// cons

  ngOnInit() {

  }

  whenBtnClicked(){

    // ID チェック
    if(this.userId.length > 2){
      this.isIdCorrect = true;
    } else {
      this.isIdCorrect = false;
      this.id_err = '無効なIDです。五文字以上入力してください。';
      return false;
    }// if

    // PW チェック
    if(this.userPw.length > 2){
      this.isPwCorrect = true;
    } else {
      this.isPwCorrect = false;
      this.pw_err = '無効なPWです。確認してください。';
      return false;
    }// if

    // Email チェック
    var email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email_regex.test(this.userEmail)){
      this.isEmailCorrect = true;
    } else {
      this.isEmailCorrect = false;
      this.email_err = '無効なメールです。確認してください。';
      return false;
    }//if

    // ユーザータイプ　チェック
    console.log(this.userType);

    this.insertDataToDB();
    this.initField();
  }// whenBtnClicked

  initField(){
    this.userId = '';
    this.userPw = '';
    this.userEmail = '';
    this.userType = 'normalUser';
  }

  insertDataToDB(){
    var insertData_json = {
      'id': this.userId,
      'pw': this.userPw,
      'email': this.userEmail,
      'userType': this.userType
    };

    this.http.post('http://localhost:3000/insertUser', insertData_json)
      .subscribe(
        (res) => {
          if(res)
            alert('加入完了。');
          else
            alert('同じIDが存在します。他のIDを入力してください。');
        },
        err => {
          console.log(err);
        }
      );
  }// insertDataToDB



}
