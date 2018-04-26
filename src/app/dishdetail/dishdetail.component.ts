import { Component, OnInit, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';

import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  comment: Comment;

  commentErrors = {
    'author': '',
    'comment': '',
  };

  commentValidationMessages = {
    'author': {
      'required': 'Author Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'A Comment is required.',
      'minlength': 'A Comment must be at least 7 characters long.',
      'maxlength': 'A Comment cannot be more than 200 characters long.'
    }
  };

  constructor(private dishservice: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private cfb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    this.createCommentForm();
  }

  createCommentForm(): any {
    this.commentForm = this.cfb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(200)]],
      date: ''
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onCommentChanged(data));

    this.onCommentChanged(); // (re)set validation messages now
  }

  onCommentChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    // tslint:disable-next-line:forin
    for (const field in this.commentErrors) {
      // clear previous error message (if any)
      this.commentErrors[field] = '';
      const control = form.get(field);
      console.log('onCommentChanged ' + field + ' is ' + control.status);
      if (control && control.dirty && !control.valid) {
        const messages = this.commentValidationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.commentErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);
    this.commentForm.reset();
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .switchMap((params: Params) =>
        this.dishservice.getDish(+params['id']))
      .subscribe(aDish => {
        this.dish = aDish;
        this.setPrevNext(aDish.id);
      });
  }

  setPrevNext(dishId: number): void {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
