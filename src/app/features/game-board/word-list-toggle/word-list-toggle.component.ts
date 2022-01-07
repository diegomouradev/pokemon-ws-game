import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WordService } from 'src/app/shared/services/word.service';

@Component({
  selector: 'app-word-list-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-list-toggle.component.html',
  styleUrls: ['./word-list-toggle.component.scss'],
})
export class WordListToggleComponent implements OnDestroy {
  constructor(private wordService: WordService) {}

  form = new FormGroup({
    toggleWordList: new FormControl(false),
  });

  valueChanges$ = this.form.valueChanges;
  valueChangesSub = this.valueChanges$.subscribe((result) =>
    this.wordService.emitToggleWordListState(result)
  );

  ngOnDestroy(): void {
    this.valueChangesSub.unsubscribe();
  }
}
