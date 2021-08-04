import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {categoryAPI} from '../core/constans/common';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private spriner: NgxSpinnerService, private toasr: ToastrService) {
  }

  getListCategories(param: any): Observable<any> {
    const newParams = new HttpParams({fromObject: param});
    return this.http.get(categoryAPI.getAll, {observe: 'response', params: newParams})
      .pipe(retry(3), catchError(this.handleError));
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(categoryAPI.createCate, data);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status === 401) {
      console.warn('xảy ra lỗi khi dăng nhập' + error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // đóng spiner
    console.log('hello mother fnck');
    // this.spiner.hide();

    // Return an observable with a user-facing error message.
    this.toasr.error(error.error.message, error.error);
    // this.toasr.error('error message', 'error code');
    // return error;
    return throwError(
      'Something bad happened; please try again later.');
  }
}
