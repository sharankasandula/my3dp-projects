import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery-9';
import {ProjectsService} from '../service/projects.service';
import {merge, Observable, OperatorFunction, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.scss'],
})
export class DisplayProjectComponent implements OnInit {
  @Input() loading;
  @Input() dataLoadedEvent: Observable<any>;
  @ViewChild('tagChooser') tagChooser: ElementRef;
  projectDetails;
  defaultTags = ['Vase', 'Useful', 'Toy', 'Educational'];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  private galleryDivWidth: string;
  customTag: string = '';
  readMore = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.galleryDivWidth = window.innerWidth.toString();
  }

  constructor(
    private projects: ProjectsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.galleryDivWidth = this.getGalleryDivWidth(window.innerWidth);

    this.loading = true;
    this.route.params.subscribe((params) => {
      this.projects.getProjectDetails(params.id).subscribe((result) => {
        this.projectDetails = result;
        // this.projectDetails.tags = ['Vase', 'Useful', 'Toy', 'Educational'];
        this.loading = false;
        this.galleryImages = this.projectDetails.images.map((img) => {
          return { small: img, medium: img, big: img };
        });
      });
    });

    this.galleryOptions = [
      {
        width: this.galleryDivWidth,
        height: this.galleryDivWidth,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
    ];
  }

  addNewTag(tag) {
    this.projects.updateNewTag(this.projectDetails.id, tag);
  }

  deleteTag(tag) {
    this.projects.deleteTag(this.projectDetails.id, tag);
  }

  addNewCustomTag(customTag) {
    this.addNewTag(customTag);
    this.customTag = '';
  }

  private getGalleryDivWidth(w: number): string {
    if (w > 500) {
      w = 500;
    } else if (w < 500 && w > 400) {
      w = w - 50;
    } else if (w < 400) {
      w = w - 15;
    }
    return w + 'px';
  }
}
