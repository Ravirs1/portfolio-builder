import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = [
    {
      question: 'What is PortfolioBuilder?',
      answer: 'PortfolioBuilder is a platform that allows users to create customizable online portfolios to showcase their work and skills.',
      show: false
    },
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by clicking on the Sign Up button on the home page and filling out the registration form.',
      show: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards and PayPal for subscription payments.',
      show: false
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time through your account settings.',
      show: false
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial for all new users to explore our features.',
      show: false
    }
  ];

}
