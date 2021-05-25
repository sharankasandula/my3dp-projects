import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private SCRAPER_ENDPOINT = environment.SCRAPER_ENDPOINT;

  constructor(private http: HttpClient) {
  }



  getSiteMetaData(projectUrl: string) {
    console.log(projectUrl);
    return this.http.post(
      this.SCRAPER_ENDPOINT,
      {text: projectUrl},
      {
        observe: 'body'
      }
    );
  }
}
