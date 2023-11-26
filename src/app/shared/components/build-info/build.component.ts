import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Build} from 'src/app/core/interfaces/build';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
})
export class BuildInfoComponent implements OnInit {
  @Input() build: Build | null = null
  @Output() onCardClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onCardClick(event: Event) {
    this.onCardClicked.emit();
  }

  getBuildName(): string | null {
    return this.build?.attributes?.build_name || null;
  }
}
