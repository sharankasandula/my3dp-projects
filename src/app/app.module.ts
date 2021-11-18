import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {LoginComponent} from './login/login.component';
import {ProjectsComponent} from './projects/projects.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AddProjectComponent} from './add-project/add-project.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ProjectDetailsComponent } from './add-project/project-details/project-details.component';
import {NgxGalleryModule} from 'ngx-gallery-9';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { HomeComponent } from './home/home.component';
import { DisplayProjectComponent } from './display-project/display-project.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GetTitlePipe } from './pipes/get-title.pipe';
import { ProjectTagsDirective } from './directives/project-tags.directive';
import { FileDropComponent } from './components/file-drop/file-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsComponent,
    AddProjectComponent,
    ProjectDetailsComponent,
    ProjectCardComponent,
    HomeComponent,
    DisplayProjectComponent,
    NavbarComponent,
    GetTitlePipe,
    ProjectTagsDirective,
    FileDropComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxGalleryModule,
    NgxContentLoadingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
