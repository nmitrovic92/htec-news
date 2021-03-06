import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../../../core/store/app.reducer';
import * as NewsActions from '../../store/news.actions';
import { Subscription, combineLatest } from 'rxjs';
import { selectCountry, selectArticles, selectLoading, selectCategory } from '../../store/news.selectors';
import { ArticleModel } from 'src/app/core/models/article.model';
import { Router, RouterEvent, NavigationStart } from '@angular/router';

@Component({
	selector: 'app-categories-page',
	templateUrl: './categories-page.component.html',
	styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit, OnDestroy {

	private stateCountrySubscription: Subscription;
	private stateArticlesSubscription: Subscription;
	private stateLoadingSubscription: Subscription;

	public country: string;
	public articles: ArticleModel[];
	public loading: boolean;
	public category: string;

	constructor(private store: Store<fromApp.AppState>, private router: Router) { }

	ngOnInit() {
		this.stateCountrySubscription =	this.store.pipe(select(selectCountry)).subscribe((country: string) => {
			this.country = country;
			this.store.dispatch(new NewsActions.FetchTopFiveNewsByCountryAndCategory({
				country: this.country, category: this.category
			}));
		});
		this.stateArticlesSubscription =
			this.store
				.pipe(select(selectArticles))
				.subscribe((articles: ArticleModel[]) => this.articles = articles);
		this.stateLoadingSubscription =
			this.store
				.pipe(select(selectLoading))
				.subscribe((loading: boolean) => this.loading = loading);
	}

	ngOnDestroy(): void {
		this.stateCountrySubscription.unsubscribe();
		this.stateArticlesSubscription.unsubscribe();
		this.stateLoadingSubscription.unsubscribe();
	}

	public onFetchNewsForCategory(category: string): void {
		this.category = category;
		setTimeout(() => {
			this.store.dispatch(new NewsActions.FetchTopFiveNewsByCountryAndCategory({ country: this.country, category }));
		}, 100);
	}

	public onShowArticleDetails(article: ArticleModel): void {
		this.store.dispatch(new NewsActions.ShowArticleDetails(article));
		this.router.navigate(['top-news', 'news-details']);
	}

	public onShowNewsForCategory(category: string): void {
		this.router.navigate(['categories', category]);
	}

}
