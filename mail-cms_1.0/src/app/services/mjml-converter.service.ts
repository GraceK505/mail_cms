import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {
  fetchDataSuccess,
  fetchDataFailure,
} from "../store/tags.actions";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class ConvertService {
  private apiUrl = "http://localhost:3000/api/convert-mjml";
  private getEmails = "http://localhost:3000/api/emails";

  constructor(private http: HttpClient, private store: Store) { }

  loadMjmlFromdb() {
    this.http.get(this.getEmails).subscribe({
      next: (data) => {
        this.store.dispatch(fetchDataSuccess({ data }));
      },
      error: (error) => {
        this.store.dispatch(fetchDataFailure({ error }));
      },
      complete: () => {
        console.log("database data fetched");
      }
    });
  }

  convert(mjml: any): Observable<HttpResponse<{ html: string }>> {
    return this.http.post<{ html: string }>(
      this.apiUrl,
      { mjml },
      {
        withCredentials: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        observe: 'response' as const // Ensures full HttpResponse is returned
      }
    );
  }
}
