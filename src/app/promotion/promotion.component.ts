import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  promotions: Promotion[];
  featured: Promotion;
  errMess: string;

  constructor(private promotionservice: PromotionService,
    @Inject('BaseURL') private BaseURL) { }

  getBaseUrl() {
    return this.BaseURL;
  }

  ngOnInit() {
    this.promotionservice.getPromotions()
      .subscribe(
        promolist =>
          this.promotions = promolist,
        errmess =>
          this.errMess = <any>errmess
      );
    this.promotionservice.getFeaturedPromotion()
      .subscribe(
        fpromo => {
          console.log('Got featured promo: ' + JSON.stringify(fpromo));
          this.featured = fpromo;
        },
        errMsg =>
          this.errMess = <any>errMsg
      );

  }
}
