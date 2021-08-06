import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {fileAPI} from '../core/constans/common';
import {Observable} from 'rxjs';
import {Form} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UploadfileServiceService {

  constructor(private http: HttpClient,
              private toasr: ToastrService) {
  }

  loadFile(formData: FormData): Observable<any> {

    console.log(formData);
    return this.http.post(fileAPI.uploadFile, formData, {
      observe: 'response',
      // headers: {'Content-Type': 'multipart/form-data', }
    });
  }
}
