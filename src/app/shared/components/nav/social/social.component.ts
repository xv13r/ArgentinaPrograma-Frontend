import { Component, Input, OnInit } from '@angular/core';
import { Social } from 'src/app/core/models/social.model';

@Component({
  selector: 'nav-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
  
export class NavSocialComponent implements OnInit{
  linkImage!:String;
  linkSocial!:String;
  socialMedia!:String;

  @Input() social!: Social;
  
  validSocialMedia:Array<String> = ["facebook", "github", "instagram", "linkedin", "reddit", "tiktok", "twitter", "youtube"];
  
  constructor(){}

  ngOnInit(): void {
    if (this.social != null) {
      if (this.validSocialMedia.includes(this.social.name.toLowerCase())){
        this.socialMedia = this.social.name.toLowerCase();
        this.linkImage = `/assets/images/icons/${this.socialMedia}.svg`;
        this.linkSocial = this.social.url;
      }
      else{
        this.socialMedia = "Not found";
        this.linkImage = `/assets/images/icons/notfound.svg`;
        this.linkSocial = "Not Found";
      }
    }
  }
}