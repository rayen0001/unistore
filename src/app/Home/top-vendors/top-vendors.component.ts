import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-vendors',
  imports: [CommonModule],
  templateUrl: './top-vendors.component.html',
  styleUrl: './top-vendors.component.css'
})
export class TopVendorsComponent {
  topVendors = [
    { name: 'Techie Gadgets', logo: 'https://ui-avatars.com/api/?name=Techie+Gadgets&background=ffffff&color=007BFF', description: 'Top tech vendor' },
    { name: 'Fashionista', logo: 'https://ui-avatars.com/api/?name=Fashionista&background=ffffff&color=007BFF', description: 'Trendy fashion items' },
    { name: 'Home Essentials', logo: 'https://ui-avatars.com/api/?name=Home+Essentials&background=ffffff&color=007BFF', description: 'Quality home products' },
    { name: 'Gizmo World', logo: 'https://ui-avatars.com/api/?name=Gizmo+World&background=ffffff&color=007BFF', description: 'Gadgets and electronics' },
    { name: 'Books Corner', logo: 'https://ui-avatars.com/api/?name=Books+Corner&background=ffffff&color=007BFF', description: 'Books, comics, and more' },
    { name: 'GadgetPro', logo: 'https://ui-avatars.com/api/?name=GadgetPro&background=ffffff&color=007BFF', description: 'The ultimate tech solutions' },
    { name: 'FashionHub', logo: 'https://ui-avatars.com/api/?name=FashionHub&background=ffffff&color=007BFF', description: 'Your go-to fashion store' },
    { name: 'Home Haven', logo: 'https://ui-avatars.com/api/?name=Home+Haven&background=ffffff&color=007BFF', description: 'Everything for your home' },
    { name: 'ElectroWorld', logo: 'https://ui-avatars.com/api/?name=ElectroWorld&background=ffffff&color=007BFF', description: 'Leading electronics shop' },
    { name: 'ReadMore', logo: 'https://ui-avatars.com/api/?name=ReadMore&background=ffffff&color=007BFF', description: 'Explore your next read' },
    { name: 'TechStar', logo: 'https://ui-avatars.com/api/?name=TechStar&background=ffffff&color=007BFF', description: 'Innovative tech for all' },
    { name: 'StyleStreet', logo: 'https://ui-avatars.com/api/?name=StyleStreet&background=ffffff&color=007BFF', description: 'Fashion trends at your fingertips' },
    { name: 'SmartLiving', logo: 'https://ui-avatars.com/api/?name=SmartLiving&background=ffffff&color=007BFF', description: 'Smarter solutions for everyday life' },
    { name: 'Gizmo Planet', logo: 'https://ui-avatars.com/api/?name=Gizmo+Planet&background=ffffff&color=007BFF', description: 'Your gadget destination' },
    { name: 'BookWorld', logo: 'https://ui-avatars.com/api/?name=BookWorld&background=ffffff&color=007BFF', description: 'Endless books for every reader' },
  ];
  
  

  ngOnInit() {
    const container = document.querySelector('.vendor-slider-track') as HTMLElement;
    
    // Ensuring the container starts with all slides off-screen to the right
    if (container) {
      container.style.transform = `translateX(${container.scrollWidth}px)`; // Start position off-screen to the right

      setInterval(() => {
        // Move the first child to the end for a smooth infinite loop
        container.appendChild(container.children[0]);
        
        // Transition without immediate sliding
        container.style.transition = 'none';
        container.style.transform = `translateX(0)`; // Reset to start position (leftwards)
        
        // Trigger reflow to ensure smooth animation
        container.offsetHeight;
        
        // Apply smooth transition after the reset
        setTimeout(() => {
          container.style.transition = 'transform 4s ease'; // Slow transition
          container.style.transform = `translateX(-${container.scrollWidth}px)`; // Slide to the left
        }, 50);
      }, 4000); 
  }
}
}
