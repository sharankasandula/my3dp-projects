import {Component, Input, OnInit} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery-9';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @Input() loading;
  @Input() dataLoadedEvent: Observable<any>;
  projectMetaData;

  constructor() {
  }

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {
    this.dataLoadedEvent.subscribe(meta => {
      console.log(meta);
      this.projectMetaData = meta;
      this.galleryImages = this.projectMetaData.images.map(img => {
        return {
          small: img,
          medium: img,
          big: img
        };
      });
      console.log(this.galleryImages);
    });

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      },
      {
        thumbnailsColumns: 3,
        thumbnailsRows: 2,
        thumbnailsPercent: 40,
        imagePercent: 60,
        thumbnailMargin: 2,
        thumbnailsMargin: 2
      },
      {imageAutoPlay: true, imageAutoPlayPauseOnHover: true, previewAutoPlay: true, previewAutoPlayPauseOnHover: true},
      {previewCloseOnClick: true, previewCloseOnEsc: true},
      {previewZoom: true, previewRotate: true},
      {image: false, thumbnailsRemainingCount: true, height: '100px'},
      {breakpoint: 500, width: '100%', thumbnailsColumns: 2},
      {imageArrowsAutoHide: true, thumbnailsArrowsAutoHide: true},
      {imageAnimation: 'slide'},
    ];


  }

}
