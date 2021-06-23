import {Component, Input, OnInit} from '@angular/core';
import {ProjectsService} from '../../service/projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  constructor( private projectData: ProjectsService) { }

  @Input() project;
  strLimit = 200;

  ngOnInit(): void {
  }

  deleteProject() {
    this.projectData.deleteProject(this.project.id)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
