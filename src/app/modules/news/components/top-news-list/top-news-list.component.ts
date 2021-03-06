import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ArticleModel } from 'src/app/core/models/article.model';

@Component({
	selector: 'app-top-news-list',
	templateUrl: './top-news-list.component.html',
	styleUrls: ['./top-news-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNewsListComponent implements OnInit {

	@Input() public articles: ArticleModel[];
	@Input() public country: string;
	@Input() public category: string;
	@Output() private showArticleDetails: EventEmitter<ArticleModel> = new EventEmitter<ArticleModel>();

	constructor() { }

	ngOnInit() {
	}

	public onShowArticleDetails(article: ArticleModel): void {
		this.showArticleDetails.emit(article);
	}

}
