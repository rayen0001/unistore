import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../admin/content/pages/categories/category.service';
import { CategoryItemComponent } from "../../category-item/category-item.component";
import { Router, RouterModule } from '@angular/router';
interface CategoryNode {
  id: number;
  label: string;
  parent?: CategoryNode | null;
  children?: CategoryNode[];
}

interface FormattedCategory {
  name: string;
  isHovered: boolean;
  subCategoryGroups: {
    name: string;
    items: string[];
  }[];
}

@Component({
  selector: 'app-category-menu',
  imports: [CommonModule, CategoryItemComponent,RouterModule],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss'
})

export class CategoryMenuComponent implements OnInit {
  topLevelCategories: CategoryNode[]=[];
  
  constructor(
    private categoryService: CategoryService,
    private router:Router
    
  ) {}

  categories = [
    {
      name: 'Informatique', 
      isHovered: false,
      subCategoryGroups: [
        {
          name: 'Ordinateurs et Laptops',
          items: [
            'Pc Portable', 
            'Pc Portable Gamer', 
            'Pc Portable Pro', 
            'Pc Tout en Un',
            'Station d\'accueil',
            'Accessoires pour Pc Portable',
            'Batteries pour Pc Portable',
            'Sacoche & Sac à dos',
            'Casque & Écouteurs',
            'Claviers'
          ]
        },
       
       
        {
          name: 'Logiciels',
          items: [
            'Sécurité et Antivirus', 
            'Microsoft Office', 
            'Systèmes d\'exploitation', 
            'Logiciels de Productivité', 
            'Bureautique', 
            'Logiciels de Création', 
            'Création Vidéo', 
            'Logiciels de Gestion de Projets', 
            'Outils de Collaboration', 
            'Développement de Logiciels'
          ]
        },
        {
          name: 'Serveurs et Réseaux',
          items: [
            'Serveur informatique', 
            'Onduleur', 
            'Routeurs et Switches', 
            'Meubles Pc', 
            'Rack de Serveur', 
            'Disque Réseau NAS', 
            'Commutateurs Ethernet', 
            'Modems', 
            'Accessoires Réseau', 
            'Firewall et Sécurité'
          ]
        }
      ]
    },
   
        
  
      
    
  ];
  



  ngOnInit(): void {
    this.fetchCategories();

    // Detect if the screen is mobile-sized
    this.isMobile = window.innerWidth <= 768;
  
    // Optional: Listen to window resize to update responsiveness dynamically
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  
    // Process categories and split items into chunks
   
  }
  

  // Utility function to split an array into chunks of a given size
  splitIntoChunks(array: any[], chunkSize: number): any[] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  toggleSubCategories(category: any): void {
    this.categories.forEach(cat => {
      if (cat !== category) cat.isHovered = false;
    });
    category.isHovered = !category.isHovered;
  }
  


  isMobile: boolean = false;



onMouseEnter(category: any): void {
  if (!this.isMobile) {
    category.isHovered = true;
  }
}

onMouseLeave(category: any): void {
  if (!this.isMobile) {
    category.isHovered = false;
  }
}

onCategoryClick(category: any): void {
  if (this.isMobile) {
    // Toggle only on mobile
    this.categories.forEach(cat => {
      if (cat !== category) cat.isHovered = false;
    });
    category.isHovered = !category.isHovered;
  }
}

navigateToItem(event: Event, item: string): void {
  event.preventDefault();
  console.log('Navigating to item:', item);
  // your logic here
}




fetchCategories() {
  this.categoryService.getCategories().subscribe({
   next: (data) => {
    
    this.transformCategories(data)
    console.log(this.topLevelCategories);
    
    },
   error: (error) => {
      console.error('Error fetching categories:', error);
    }}
  );
}

transformCategories(raw: any[]) {
  // Build a map of all categories by ID
  const categoryMap = new Map<number, any>();
  raw.forEach(cat => {
    categoryMap.set(cat.id, { ...cat, children: [] });
  });

  // Recursively attach children
  raw.forEach(cat => {
    if (cat.parent && categoryMap.has(cat.parent.id)) {
      const parent = categoryMap.get(cat.parent.id);
      parent.children.push(categoryMap.get(cat.id));
    }
  });

  // Return only top-level categories
  this.topLevelCategories = Array.from(categoryMap.values()).filter(cat => !cat.parent);
}

productDetail(event:any){
    this.router.navigate(["/product/"+event.target.id])
  }


}