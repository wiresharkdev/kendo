import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { employees } from './employees';
import { images } from './images';

@Component({
  selector: 'app-kendo-component',
  templateUrl: './kendo-component.component.html',
  styleUrls: ['./kendo-component.component.scss']
})
export class KendoComponentComponent implements OnInit {
  // @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData: any[] = employees;
  public gridView: any[] = [];

  public mySelection: string[] = [];

  constructor() {
  }

  public ngOnInit(): void {
    this.gridView = this.gridData;
  }

  public onFilter(event: Event): void {
    const inputValue = (<HTMLInputElement>event.target).value;
    this.gridView = process(this.gridData, {
      filter: {
        logic: "or",
        filters: [
          {
            field: 'full_name',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'job_title',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'budget',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;

    // this.dataBinding.skip = 0;
  }

  public photoURL(dataItem: any): string {
    const code: string = dataItem.img_id + dataItem.gender;
    const image: any = images;

    return image[code];
  }

  public flagURL(dataItem: any): string {
    const code: string = dataItem.country;
    const image: any = images;

    return image[code];
  }
}