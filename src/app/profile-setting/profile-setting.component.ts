import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileSettingService } from './profile-setting.service';

@Component({
  selector: 'app-profile-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  providers: [ProfileSettingService],
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent implements OnInit {
  profileForm: FormGroup;
  userId: any;
  activeTab: string = 'basicInfo'; // Default active tab

  constructor(private fb: FormBuilder, private profileService: ProfileSettingService) {
    this.profileForm = this.fb.group({
      basicInfo: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: [''],
        dob: ['']
      }),
      contactInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['']
      }),
      professionalDetails: this.fb.group({
        profession: [''],
        organization: [''],
        experience: ['']
      }),
      socialLinks: this.fb.group({
        linkedin: [''],
        github: [''],
        twitter: [''],
        website: ['']
      }),
      bio: ['', Validators.maxLength(500)],
    });
  }

  ngOnInit(): void {
    const credentials = sessionStorage.getItem('credentials');
    this.userId = credentials ? JSON.parse(credentials).uid || '' : '';
    // Load profile data on init
    this.profileService.getProfile(this.userId).subscribe(profileData => {
      if (profileData) {
        this.profileForm.patchValue(profileData);
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.profileService.saveProfile(this.profileForm.value).then(() => {
        console.log('Profile saved successfully!');
      }).catch(error => {
        console.error('Error saving profile:', error);
      });
    }
  }

  // The onUpdate and onDelete methods can be implemented if needed.
}
