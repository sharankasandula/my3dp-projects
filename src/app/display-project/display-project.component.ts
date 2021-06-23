import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery-9';
import {ProjectsService} from '../service/projects.service';
import {merge, Observable, OperatorFunction, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-display-project',
  templateUrl: './display-project.component.html',
  styleUrls: ['./display-project.component.scss']
})
export class DisplayProjectComponent implements OnInit {

  @Input() loading;
  @Input() dataLoadedEvent: Observable<any>;
  projectDetails;
  defaultTags = ['Vase', 'Useful', 'Toy', 'Educational'];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  private galleryDivWidth: string;
  model: any;

  @ViewChild('tagSelector', {static: true}) tagSelector: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    text$.subscribe((val) => console.log(val));
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.tagSelector.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.defaultTags
        : this.defaultTags.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.galleryDivWidth = window.innerWidth.toString();
  }

  constructor(private projects: ProjectsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.galleryDivWidth = this.getGalleryDivWidth(window.innerWidth);

    this.loading = true;
    this.route.params.subscribe(params => {
      this.projects.getProjectDetails(params.id)
        .subscribe(result => {
          this.projectDetails = result;
          this.projectDetails.tags = ['Vase', 'Useful', 'Toy', 'Educational'];
          this.loading = false;
          this.galleryImages = this.projectDetails.images.map((img) => {
            return {small: img, medium: img, big: img};
          });
        });
    });

    this.galleryOptions = [
      {
        width: this.galleryDivWidth,
        height: this.galleryDivWidth,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];
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
