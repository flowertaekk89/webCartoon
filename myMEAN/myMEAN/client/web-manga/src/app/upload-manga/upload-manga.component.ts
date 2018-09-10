import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload-manga',
  templateUrl: './upload-manga.component.html',
  styleUrls: ['./upload-manga.component.scss']
})
export class UploadMangaComponent implements OnInit {

  @Output() fileUploaded = new EventEmitter();
  private title: string = '';
  private subtitle: string = '';
  private episode: number;
  private cover_img: string = '';
  private manga_img: string = '';

  @ViewChild('mangaFileRef')
  mangaFileRef: ElementRef;

  @ViewChild('coverFileRef')
  coverFileRef: ElementRef;

  private mangaFile: File = null;
  private coverFile: File = null;

  private updateForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private _el: ElementRef, private _r: Renderer2) {
    this.updateForm = fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      episode: ['', Validators.required]
    });
  }// cons

  ngOnInit() {}

  uploadMangaFile(event){
    this.mangaFile = event.target.files[0];
  }// onFileChanged

  uploadCoverFile(event){
    this.coverFile = event.target.files[0];

  }// uploadCoverFile

  onUpload(file, fileType){
    if(file != null){
      const uploadData = new FormData();
      uploadData.append(fileType, file, file.name);
      uploadData.append('title', this.title);

      this.http.post('http://localhost:3000/fileUpload', uploadData)
        .subscribe(
          () => {alert('アップロード成功!')},
          err => console.log(err)
        );// post
    }// if
  }// onUpload

  onSubmit(){

    if(this.validation()){

      var fileInfo_json = {
        'coverFile': null,
        'mangaFile': this.mangaFile.name,
        'title': this.title,
        'episode': this.episode,
        'subtitle': this.subtitle
      };

      if(this.coverFile != null){
        fileInfo_json['coverFile'] = this.coverFile.name;
      }// if

      this.http.post('http://localhost:3000/fileToDB', fileInfo_json)
        .subscribe(
          (data) => {
            // console.log('db ok!');
            if(data['msg'] === true){
              // alert(JSON.stringify(this.coverFile));
              this.onUpload(this.coverFile, 'coverFile');
              this.onUpload(this.mangaFile, 'mangaFile');
              this.fileUploaded.emit();
            } else {
              alert('同じファイル名が存在します。');
            }// if

            // console.log('TEST : ' + JSON.stringify(data));
          },
          err => console.log(err)
        );
    }// if

  }// onSubmit

  validation(){
    if(this.title.length == 0){
      alert('タイトルを確認してください。');
      return false;
    }
    if(this.episode == undefined){
      alert('エピソードを確認してください。')
      return false;
    }
    if(this.subtitle.length == 0){
      alert('エピソードのタイトルを確認してください。')
      return false;
    }
    // if(this.coverFile == null){
    //   alert('表紙ファイルを確認してください。')
    //   return false
    // } ;
    if(this.mangaFile == null){
      alert('マンガファイルを確認してください。')
      return false
    } ;
    return true;
  }// validation

  init(form: any){
    const success = this._el.nativeElement.querySelectorAll('.counter-success');
    const danger = this._el.nativeElement.querySelectorAll('.counter-danger');
    const textSuccess = this._el.nativeElement.querySelectorAll('.text-success');
    const textDanger = this._el.nativeElement.querySelectorAll('.text-danger');

    success.forEach((element: any) => {
        this._r.removeClass(element, 'counter-success');
    });
    danger.forEach((element: any) => {
        this._r.removeClass(element, 'counter-danger');
    });
    textSuccess.forEach((element: any) => {
        this._r.setStyle(element, 'visibility', 'hidden');
    });
    textDanger.forEach((element: any) => {
        this._r.setStyle(element, 'visibility', 'hidden');
    });
    
    form.reset();

    this.mangaFileRef.nativeElement.value = '';
    this.coverFileRef.nativeElement.value = '';
    this.mangaFile = null;
    this.coverFile = null;
  }// init

}
