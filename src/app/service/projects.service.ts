import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import {removeWhitespaces} from '@angular/compiler/src/ml_parser/html_whitespaces';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  PROJECTS_COLLECTION = 'projects';
  USERS_COLLECTION = 'users';
  usersDocRef;
  userData;
  projects;
  private SCRAPER_ENDPOINT = environment.SCRAPER_ENDPOINT;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {
    this.usersDocRef = this.firestore.collection(this.USERS_COLLECTION);
    this.usersDocRef.valueChanges().subscribe((userData) => {
      this.userData = userData[0];
    });
  }

  getSiteMetaData(projectUrl: string) {
    return this.http.post(
      this.SCRAPER_ENDPOINT,
      {text: projectUrl},
      {
        observe: 'body',
      }
    );
  }

  async addNewProject(projectMetaData: any) {
    const projectId = this.getIdFromLink(projectMetaData.link);
    const result = await this.usersDocRef.doc(this.userData.uid).collection('projects')
      .doc(projectId).set(projectMetaData)
      .catch(e => 'Could not add the project to firebase');
    console.log(result);
    return result;
  }

  private getIdFromLink(link: string) {
    let url;
    try {
      url = new URL(link);
    } catch (e) {
      console.error('Not a valid URL', e);
    }
    const id = new RegExp('thing:([0-9]+)');
    return id.exec(url.pathname)[1];
  }

  private getUid() {
    return JSON.parse(sessionStorage.getItem('firebase')).uid;
  }

  getProjects() {
    return this.usersDocRef.doc(this.getUid()).collection(this.PROJECTS_COLLECTION)
      .valueChanges({idField: 'id'});
  }

  getProjectDetails(projectId: string) {
    return this.usersDocRef.doc(this.getUid()).collection(this.PROJECTS_COLLECTION)
      .doc(projectId)
      .valueChanges({idField: 'id'});
  }

  deleteProject(projectId) {
    return this.projects
  }
}