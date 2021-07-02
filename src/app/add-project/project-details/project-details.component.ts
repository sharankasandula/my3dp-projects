import { Component, Input, OnInit } from '@angular/core';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from 'ngx-gallery-9';
import { Observable } from 'rxjs';
import { ProjectsService } from 'src/app/service/projects.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() loading;
  @Input() dataLoadedEvent: Observable<any>;
  projectMetaData;

  constructor(private projects: ProjectsService) {}

  galleryOptions: NgxGalleryOptions[] = [environment.NGX_GALLERY_CONFIG];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {
    this.loading = false;
    this.dataLoadedEvent.subscribe((meta) => {
      this.projectMetaData = meta;
      this.addNewProject();
      this.loading = false;
      this.galleryImages = this.projectMetaData.images.map((img) => {
        return {small: img, medium: img, big: img};
      });
    });

  }

  addNewProject() {
    this.projects.addNewProject(this.projectMetaData);
  }
}
