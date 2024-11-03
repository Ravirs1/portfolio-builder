import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  faqs = [
    { question: 'How do I create my portfolio?', answer: 'Simply sign up and follow the easy steps to choose a template and customize it.' },
    { question: 'Can I change my template later?', answer: 'Yes, you can change your template anytime from your account settings.' }
    // Add more FAQs as needed
  ];
  
  activeIndex: number | null = null;

  toggleAnswer(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  getStarted() {
    if(sessionStorage.getItem('credentials')) {
      this.router.navigate(['profile-setting']);
    } else {
      this.router.navigate(['auth']);
    }
  }

}
