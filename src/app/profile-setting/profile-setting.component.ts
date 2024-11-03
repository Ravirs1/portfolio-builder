import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
  selectedFiles: any = [];

  constructor(private fb: FormBuilder, private profileService: ProfileSettingService) {
    this.profileForm = this.fb.group({
      basicInfo: this.fb.group({
        firstName: [''],
        lastName: [''],
        gender: [''],
        dob: ['']
      }),
      contactInfo: this.fb.group({
        email: ['', [ Validators.email]],
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
      filesAndLinks: this.fb.group({
        files: this.fb.array([]),
        externalLinks: this.fb.array([])
      })
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
      const formData = {
        ...this.profileForm.value,
        filesAndLinks: {
          files: this.files.value,
          externalLinks: this.externalLinks.value
        }
      };

      this.profileService.saveProfile(formData, this.selectedFiles).then(() => {
        console.log('Profile saved successfully, including files and links!');
      }).catch(error => {
        console.error('Error saving profile with files and links:', error);
      });
    }
  }

  // Getters for files and external links
  get files(): FormArray {
    return this.profileForm.get('filesAndLinks.files') as FormArray;
  }

  get externalLinks(): FormArray {
    return this.profileForm.get('filesAndLinks.externalLinks') as FormArray;
  }

  // Method to add a new file input
  addFile(): void {
    this.files.push(new FormControl(''));
  }

  removeFile(index: number): void {
    this.files.removeAt(index);
  }

  addExternalLink(): void {
    this.externalLinks.push(new FormControl('', Validators.required));
  }
  
  removeExternalLink(index: number): void {
    this.externalLinks.removeAt(index);
  }

  // Handle file selection
  onFileSelected(event: Event, index: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFiles[index] = fileInput.files[0];
      // Additional logic for file handling can go here
    }
  }
}
