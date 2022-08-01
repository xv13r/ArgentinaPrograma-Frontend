import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessage } from 'src/app/core/models/error-message';
import { Profile } from 'src/app/core/models/profile.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UploadService } from 'src/app/core/services/file.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})

export class BannerComponent implements OnInit {
  isLoggedIn: boolean = false;
  profile!:Profile;

  image!: String;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService:ProfileService,
    private uploadService: UploadService) { }

  clickHandlerEdit(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = reader.result as string;
      }
      this.uploadService.upload(file).subscribe({
        next: (data: any) => {
          this.profile.bannerId = data;
          this.updateProfileBanner(this.profile);
        },
        error: (err: ErrorMessage) => {
        }
      });
    }
  }

  updateProfileBanner(profile: Profile){
    this.profileService.update(profile.id as string, profile).subscribe({
      next: (data: Profile) => {
        this.profile = data;
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  getBanner(id: String) {
    this.uploadService.getById(id).subscribe({
      next: (data: any) => {
        this.createImgeFromBlob(data);
      },
      error: (err: ErrorMessage) => {
        this.image = "assets/images/nodisponible200x200.png";
      }
    });
  }

  getProfile(){
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.profileService.getById(id).subscribe({
      next: (data: Profile) => {
        this.profile = data;
        if (!this.profile.bannerId){
          this.image = "assets/images/nodisponible200x200.png";
        }
        else{
          this.getBanner(this.profile.bannerId);
        }
      },
      error: (err: ErrorMessage) => {
      }
    });
  }

  createImgeFromBlob(image: Blob) {
    const reader = new FileReader();

    reader.onload = () => {
      this.image = reader.result as string;
    }

    if (image) {
      if (image.type !== "image/*") {
        reader.readAsDataURL(image);
      }
    }
    else {
      this.image = "assets/images/nodisponible200x200.png";
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getProfile();
  }
}