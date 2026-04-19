import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Faq { q: string; a: string; }

@Component({
  selector: 'app-help-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './help-section.html',
  styleUrl: './help-section.scss'
})
export class HelpSection {

  private fb = inject(FormBuilder);

  activeTab   = signal<'faq' | 'contact'>('faq');
  openFaq     = signal<number | null>(null);
  formSent    = signal(false);

  contactForm: FormGroup = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  contactChannels = [
    { icon: '💬', title: 'Live Chat',     desc: 'Chat with us now',            sub: 'Avg. 2 min response', color: '#6BCFB0' },
    { icon: '📧', title: 'Email Support', desc: 'support@kiddithread.com',     sub: 'Reply within 24 hours', color: '#74C7EC' },
    { icon: '📞', title: 'Call Us',       desc: '+1 800-KIDDI-TH',             sub: 'Mon–Fri, 9AM–6PM', color: '#FF6B6B' },
  ];

  faqs: Faq[] = [
    { q: 'How do I track my order?',
      a: 'Go to "My Orders" in the navigation, then click on your order ID to expand the tracker. You\'ll see a real-time step-by-step status from placement to delivery.' },
    { q: 'What is your return policy?',
      a: 'We offer 30-day hassle-free returns. Items must be unworn with original tags attached. Initiate a return from the Orders page by clicking "Return Item".' },
    { q: 'How do I use a promo code?',
      a: 'Add items to your cart, then go to the Cart page. You\'ll see a promo code input field — enter your code and click Apply. The discount is reflected instantly in your total.' },
    { q: 'Do you offer free shipping?',
      a: 'Yes! Orders above $50 qualify for free shipping automatically. For orders below $50, a flat $5.99 shipping fee applies.' },
    { q: 'How do I find the right size for my child?',
      a: 'Each product page has a size selector. Kids sizes range from 2Y to 12Y. When between sizes, we recommend sizing up for a comfortable fit as kids grow fast!' },
    { q: 'Can I change or cancel my order?',
      a: 'Orders can be changed or cancelled within 2 hours of placement while still in "Processing" status. Go to My Orders and click "Cancel Order". After 2 hours, contact support immediately.' },
    { q: 'How long does delivery take?',
      a: 'Standard delivery takes 2–3 business days. Express delivery (1 business day) is available at checkout for an additional fee. Orders are processed Monday–Friday.' },
    { q: 'Are your fabrics safe for sensitive skin?',
      a: 'Absolutely! All our kids\' clothing is made from hypoallergenic, OEKO-TEX certified fabrics. They\'re free from harmful dyes and chemicals, tested safe for babies and toddlers.' },
  ];

  toggleFaq(index: number) {
    this.openFaq.update(curr => curr === index ? null : index);
  }

  isFaqOpen(index: number): boolean {
    return this.openFaq() === index;
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.contactForm.get(field);
    return !!(ctrl?.hasError(error) && ctrl?.touched);
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    // TODO: wire up to your backend/email service
    console.log('Contact form:', this.contactForm.value);
    this.formSent.set(true);
  }

  resetForm() {
    this.contactForm.reset();
    this.formSent.set(false);
  }
}