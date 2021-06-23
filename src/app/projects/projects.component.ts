import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectsService} from '../service/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  allProjects: any;

  constructor(
    private projectsService: ProjectsService) {
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.allProjects = this.projectsService.getProjects();
  }


}
