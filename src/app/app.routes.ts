// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FeaturesComponent } from './features/features.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { PricingComponent } from './pricing/pricing.component';
import { FaqComponent } from './faq/faq.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { PortfolioDisplayComponent } from './portfolio-display/portfolio-display.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile-setting', component: ProfileSettingComponent },
  { path: 'portfolio/:id', component: PortfolioDisplayComponent },
  { path: '**', redirectTo: '' }
];
