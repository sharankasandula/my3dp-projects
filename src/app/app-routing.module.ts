import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './service/auth.guard';
import {LoginComponent} from './login/login.component';
import {ProjectsComponent} from './projects/projects.component';
import {AddProjectComponent} from './add-project/add-project.component';
import {HomeComponent} from './home/home.component';
import {DisplayProjectComponent} from './display-project/display-project.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'project/:id',
    component: DisplayProjectComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
