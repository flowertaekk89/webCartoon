import { Component, Input, OnInit, Pipe } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.scss']
})
export class MangaComponent implements OnInit {

  @Input()
  userLogined: boolean = false;

  @Input()
  manga: {
    'title': string,
    'cover_img': string,
    'manga_img': string,
    'episode': number,
    'uploadedAt': string
  };

  length:number = 0;
  opened:boolean = false;
  private mangas: any;
  constructor(private http: HttpClient) {}// cons

  ngOnInit(): void {
    var condition_json = {
      title: this.manga.title
    };//condition_json

    this.http.post('http://localhost:3000/manga/readManga', condition_json)
      .subscribe(
        (res) => {
          this.mangas = res;
          this.mangas.push({'opened': false});

        },
        err => {console.log(err);}
      );
  }// ngOnInit

  whenError(event){
    this.manga.cover_img = 'C:/Users/geuntaek/Desktop/angularTest/default.png';
  }// whenError

}
