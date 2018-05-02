import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  disherrMess: string;
  promoErrMess: any;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  getBaseUrl() { return this.BaseURL; }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(fDish => this.dish = fDish,
        errmess => this.disherrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
      .subscribe(fPromo => this.promotion = fPromo,
        errMess => this.promoErrMess = <any>errMess);
    this.leaderservice.getFeaturedLeader()
      .subscribe(aLead => this.leader = aLead);
  }

}
