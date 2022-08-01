import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'card-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  providers: [NgbCarouselConfig]
})

export class CardImagesComponent implements OnInit {
  @Input() images: String[] = [];

  showNavigationArrows = false;
  showNavigationIndicators = false;

  constructor(private sanitizer: DomSanitizer,
    config: NgbCarouselConfig) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
    config.interval = 1500;
  }

  ngOnInit() {
    if (!this.isEmpty(this.images)) {
      if (this.images.length > 1) {
        this.showNavigationArrows = true;
        this.showNavigationIndicators = true;
      }
      else {
        this.showNavigationArrows = false;
        this.showNavigationIndicators = false;
      }
    }
    else {
      this.images = ["assets/images/nodisponible200x200.png"];
    }
  }

  isEmpty(value: String[]): boolean {
    return (
      (value == null) ||
      (typeof value == "undefined") ||
      (Array.isArray(value) ? ((value || [])?.length || 0) == 0 : true)
    );
  }
}