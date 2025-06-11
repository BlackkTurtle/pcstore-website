import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TabItem } from '../interfaces/tabItem.interface';
import { ModelTabComponent } from './components/model-tab/model-tab.component';
import { ProductListTabComponent } from './components/product-list-tab/product-list-tab.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.checkAdmin().subscribe({
      next: () => {
      },
      error: () => {
        this.router.navigate(['/'])
      }
    });
  }

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  tabs: TabItem[] = [];
  activeTabIndex: number = -1;

  addModelTab() {
    this.openOrCreateTab('model', 'Model Tab', ModelTabComponent);
  }

  addProductListTab() {
    this.openOrCreateTab('productList', 'Product List Tab', ProductListTabComponent);
  }

  private openOrCreateTab(type: string, title: string, component: Type<any>) {
    const existingIndex = this.tabs.findIndex(tab => tab.type === type);
    if (existingIndex !== -1) {
      this.activateTab(existingIndex);
    } else {
      const tab: TabItem = { title, component, type };
      this.tabs.push(tab);
      this.activateTab(this.tabs.length - 1);
    }
  }

  activateTab(index: number) {
    this.activeTabIndex = index;
    this.container.clear();
    this.container.createComponent(this.tabs[index].component);
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
    if (this.activeTabIndex === index) {
      this.activeTabIndex = this.tabs.length > 0 ? this.tabs.length - 1 : -1;
      if (this.activeTabIndex !== -1) {
        this.container.clear();
        this.container.createComponent(this.tabs[this.activeTabIndex].component);
      } else {
        this.container.clear();
      }
    } else if (index < this.activeTabIndex) {
      this.activeTabIndex--;
    }
  }
}