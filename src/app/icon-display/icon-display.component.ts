import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

interface IconData {
  name: string;
  tags: string[];
  versions: {
    svg: string[];
    font: string[];
  };
}

@Component({
  selector: 'app-icon-display',
  templateUrl: './icon-display.component.html',
  styleUrls: ['./icon-display.component.scss']
})
export class IconDisplayComponent implements OnInit {
  icons: IconData[] = [];
  textSearch = '';
  tagSearch = 'Filter by tag';
  tagChoices: string[];
  displayDetails = false;
  // selected icon details
  selectedIcon: IconData;
  selectedIconName: string;
  selectedIconVersions: { [key: string]: string };
  selectedIconVersion: string;
  // toggles
  toggleColorSwitch: boolean;
  toggleWordmarkSwitch: boolean;
  // css / svg selection
  cssSelected = true;

  // eslint-disable-next-line no-unused-vars
  constructor(private data: DataService, private renderer: Renderer2, private http: HttpClient) {}

  ngOnInit() {
    this.tagChoices = [...new Set(this.icons.flatMap((obj: IconData) => obj.tags))].sort();
    this.data.selectedIcon.subscribe((v: any) => (this.selectedIcon = v));
    this.data.selectedIconName.subscribe((v: string) => (this.selectedIconName = v));
    this.data.selectedIconVersions.subscribe((v: { [key: string]: string }) => (this.selectedIconVersions = v));
    this.data.selectedIconVersion.subscribe((v: string) => (this.selectedIconVersion = v));
    this.data.toggleColorSwitch.subscribe((v: boolean) => (this.toggleColorSwitch = v));
    this.data.toggleWordmarkSwitch.subscribe((v: boolean) => (this.toggleWordmarkSwitch = v));
    this.data.cssSelected.subscribe((v: boolean) => (this.cssSelected = v));
    this.fetchIcons();
  }

    fetchIcons() {
    const iconsUrl = 'https://raw.githubusercontent.com/devicons/devicon/master/devicon.json';
    this.http.get<IconData[]>(iconsUrl).subscribe(
      (data: IconData[]) => {
        this.icons = data.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
        this.tagChoices = [...new Set(this.icons.flatMap((obj: IconData) => obj.tags))].sort();
      },
      (error) => {
        console.error('Error fetching icons:', error);
      }
    );
  }

  handleDropdownDisplay() {
    // display placeholder
    if (this.tagSearch === 'None') this.tagSearch = 'Filter by tag';
  }

  showDetails(icon: IconData) {
    if (this.toggleWordmarkSwitch) this.data.changeWordmarkToggle(false);
    if (this.toggleColorSwitch) this.data.changeColorToggle(false);

    this.data.changeDisplayDetails(true);

    this.data.changeSelectedIcon(icon);
    this.data.changeSelectedIconName(icon.name);

    this.data.updateDefaultIconVersion(this.selectedIconVersions);
    this.data.updateCodeSnippet(
      this.toggleColorSwitch ? ' colored' : '',
      this.toggleWordmarkSwitch ? '-wordmark' : '',
      this.cssSelected,
      this.selectedIconName,
      this.selectedIconVersion
    );

    // disable scroll on mobile
    if (/Mobi/i.test(window.navigator.userAgent)) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    }
  }
}
