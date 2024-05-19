import { Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  @Output()
  tabChangeEmitter = new EventEmitter<string>;

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter(tab => tab.active)

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    if (tab.title && !tab.active) {
      this.tabChangeEmitter.emit(tab.title);
    }

    this.tabs.toArray().forEach(tab => (tab.active = false));
    tab.active = true;
  }
}
