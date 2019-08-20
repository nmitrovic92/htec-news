import { Action } from '@ngrx/store';
import { NewsModel } from 'src/app/core/models/news.model';
import { ArticleModel } from 'src/app/core/models/article.model';

export const CHANGE_COUNTRY = '[News] Change Country';
export const FETCH_NEWS_BY_COUNTRY = '[News] Fetch News By Country';
export const STORE_NEWS = '[News] Store News';
export const SHOW_ARTICLE_DETAILS = '[News] Show Article Details';
export const HIDE_ARTICLE_DETAILS = '[News] Hide Article Details';

export class ChangeCountry implements Action {
	readonly type = CHANGE_COUNTRY;

	constructor(public payload: string) {}
}

export class FetchTopNewsByCountry implements Action {
	readonly type = FETCH_NEWS_BY_COUNTRY;

	constructor(public payload: string) {}
}

export class StoreTopNews implements Action {
	readonly type = STORE_NEWS;

	constructor(public payload: NewsModel) {}
}

export class ShowArticleDetails implements Action {
	readonly type = SHOW_ARTICLE_DETAILS;

	constructor(public payload: ArticleModel) {}
}

export class HideArticleDetails implements Action {
	readonly type = HIDE_ARTICLE_DETAILS;

	constructor() {}
}

export type NewsActionTypes =
	ChangeCountry |
	FetchTopNewsByCountry |
	StoreTopNews |
	ShowArticleDetails |
	HideArticleDetails;