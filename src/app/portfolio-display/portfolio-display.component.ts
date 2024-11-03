import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import for route parameters
import { ProfileSettingService } from '../profile-setting/profile-setting.service';
import { Profile } from '../profile-setting/profile.model';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-portfolio-display',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  providers: [ProfileSettingService],
  templateUrl: './portfolio-display.component.html',
  styleUrls: ['./portfolio-display.component.scss'] // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class PortfolioDisplayComponent implements OnInit {
  activeTab = 'about'; // Default tab
  profileData: Profile | undefined; // Changed to use the Profile type

  constructor(
    private profileService: ProfileSettingService,
    private route: ActivatedRoute // Inject ActivatedRoute to get route parameters
  ) {}

  ngOnInit(): void {
    const profileId = this.route.snapshot.paramMap.get('id'); // Get the profile ID from route parameters
    if (profileId) {
      this.profileService.getProfile(profileId).subscribe((data: any) => {
        console.log(data)
        this.profileData = data; // Assign fetched data to profileData
      });
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  isImage(file: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
    return imageExtensions.some(ext => file.endsWith(ext));
  }
  
}
