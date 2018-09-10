import { Component, OnInit, Input } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private userLogined: boolean = false;
  private opened: boolean = false;
  private mangas: any = undefined;
  private searchWord: string = '';

  loginUser: {
    'id': string,
    'pw': string,
    'email': string,
    'userType': string
  }

  constructor(private http: HttpClient){
    this.findAllManga();
  }//constructor

  ngOnInit(): void {
    this.loginUser = {
      'id': null,
      'pw': null,
      'email': null,
      'userType': null
    }
  }//ngOnInit

  findAllManga(){
    console.log('findAllManga')
    this.http.post('http://localhost:3000/manga/findAll', '')
      .subscribe(
        (res) => {
          this.mangas = res;
        },
        err => console.log(err)
      );
  }//findAllManga

  isLogined(emp){
    if(emp){
      this.loginUser = {
        'id': emp.userid,
        'pw': emp.userpw,
        'email': emp.userEmail,
        'userType': emp.userType
      }

      //console.log(this.loginUser);
      this.userLogined = true;
    }// if
  }//isLogined

  search(){
    let condition = {
      'title': this.searchWord
    }
    this.http.post('http://localhost:3000/searchManga', condition)
      .subscribe(
        (res) => {
          this.mangas = res;
        },
        err => console.log(err)
      );
  }// search

  logout(){
    this.userLogined = false;
    this.loginUser = {
      'id': null,
      'pw': null,
      'email': null,
      'userType': null
    }
  }

}
