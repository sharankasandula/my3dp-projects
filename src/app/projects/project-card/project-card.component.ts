import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ProjectsService} from '../../service/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  constructor(private projectData: ProjectsService, private router: Router) {}

  @Input() project;
  strLimit = 200;

  ngOnInit(): void {}

  navigateToProject() {
    this.router.navigate(['/project/' + this.project.id])
  }

  deleteProject() {
    if (confirm('Do you want to delete this project') === true) {
      this.projectData.deleteProject(this.project.id)
    }
  }
}
