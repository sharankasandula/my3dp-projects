import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../service/projects.service';
import {Subject} from 'rxjs';

// @ts-ignore
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  projectUrl: string;
  loading: boolean;
  metaDataLoadedEvent: Subject<any> = new Subject<any>();

  constructor(private projects: ProjectsService) { }

  ngOnInit(): void {
    this.getMetaData();
  }

  getMetaData() {
    this.loading = true;
    this.projects.getSiteMetaData(this.projectUrl)
    .subscribe((result => {
      this.metaDataLoadedEvent.next(result);
    }));
  }
}
