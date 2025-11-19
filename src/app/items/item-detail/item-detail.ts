import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ItemService } from '../../services/item';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-detail.html',
  styleUrls: ['./item-detail.css']
})
export class ItemDetail implements OnInit {
  item: any;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService //
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemService.getItems().subscribe(data => {
        const itemsData = data.data;
        this.item = itemsData[id];
      });
    }
  }

}
