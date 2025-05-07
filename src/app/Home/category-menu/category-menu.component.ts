import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-menu',
  imports: [CommonModule],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss'
})
export class CategoryMenuComponent implements OnInit {
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
          name: 'Ordinateurs de Bureau',
          items: [
            'Pc de bureau', 
            'Pc de Bureau Gamer', 
            'Pc Tout en un', 
            'Workstations', 
            'Serveur de Bureau',
            'Full Setup Gamer', 
            'Ecran 4K', 
            'Claviers et Souris',
            'Stations de travail',
            'Composants supplémentaires'
          ]
        },
        {
          name: 'Composants et Périphériques',
          items: [
            'Processeur', 
            'Barrette mémoire', 
            'Carte mère', 
            'Carte graphique', 
            'Disque dur Interne',
            'Disque SSD', 
            'Ventilateur & Refroidisseur', 
            'Alimentation', 
            'Moniteurs', 
            'Webcams'
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
    {
      name: 'Téléphonie et Mobilité', 
      isHovered: false,
      subCategoryGroups: [
        {
          name: 'Smartphones et Tablettes',
          items: [
            'Smartphones Android', 
            'iPhone', 
            'Tablettes Android', 
            'Tablettes iOS', 
            'Accessoires Téléphonie', 
            'Coques et Étuis', 
            'Chargeurs', 
            'Écouteurs Bluetooth', 
            'Support de téléphone', 
            'Montres Connectées'
          ]
        },
        {
          name: 'Accessoires Mobilité',
          items: [
            'Casques et Écouteurs', 
            'Chargeurs et Batteries', 
            'Support voiture', 
            'Câbles USB', 
            'Station d\'accueil', 
            'Station de Charge', 
            'Clé USB', 
            'Adaptateurs', 
            'Pochettes et Étuis', 
            'Tapis de souris'
          ]
        },
        {
          name: 'Réseau Mobile et Internet',
          items: [
            'Modems 4G', 
            'Routeurs WiFi', 
            'Amplificateur de Signal', 
            'Clé 3G/4G', 
            'Accès WiFi', 
            'Amplificateurs d\'antenne', 
            'VPN et Sécurité', 
            'Réseaux Privés', 
            'Hotspot WiFi', 
            'Dispositifs IoT'
          ]
        }
      ]
    },
    {
      name: 'Maison et Domotique', 
      isHovered: false,
      subCategoryGroups: [
        {
          name: 'Équipements Connectés',
          items: [
            'Ampoules LED Connectées', 
            'Thermostats Intelligents', 
            'Caméras de Surveillance', 
            'Prises Connectées', 
            'Serrures Connectées', 
            'Assistants Vocaux', 
            'Interphones Vidéo', 
            'Stations Météo Connectées', 
            'Détecteurs de Mouvement', 
            'Télécommandes Universelles'
          ]
        },
        {
          name: 'Électroménager',
          items: [
            'Réfrigérateurs', 
            'Lave-linge', 
            'Sèche-linge', 
            'Lave-vaisselle', 
            'Fours et Micro-ondes', 
            'Cuisinières et Plaques', 
            'Aspirateurs', 
            'Climatisation', 
            'Cafetière', 
            'Grille-pain'
          ]
        },
        {
          name: 'Sécurité à Domicile',
          items: [
            'Alarmes', 
            'Caméras de sécurité', 
            'Serrures de Porte', 
            'Cadenas', 
            'Interphones', 
            'Systèmes de Surveillance', 
            'Capteurs de Mouvement', 
            'Détecteurs de Fumée', 
            'Détecteurs de Gaz', 
            'Vidéosurveillance'
          ]
        }
      ]
    }
  ];
  


  constructor() { }

  ngOnInit(): void {
    // Detect if the screen is mobile-sized
    this.isMobile = window.innerWidth <= 768;
  
    // Optional: Listen to window resize to update responsiveness dynamically
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  
    // Process categories and split items into chunks
    this.categories.forEach(category => {
      category.subCategoryGroups.forEach(group => {
        group.items = this.splitIntoChunks(group.items, 10);
      });
    });
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

}