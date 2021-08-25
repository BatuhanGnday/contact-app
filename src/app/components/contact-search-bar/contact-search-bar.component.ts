import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'contact-search-bar',
  templateUrl: './contact-search-bar.component.html',
  styleUrls: ['./contact-search-bar.component.scss']
})
export class ContactSearchBarComponent implements OnInit {

  @Input() searchForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }
}
