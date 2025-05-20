import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiderComponent } from '../sider/sider.component';

@Component({
  selector: 'app-core',
  imports: [CommonModule, RouterModule, SiderComponent],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss'
})
export class CoreComponent {

}
