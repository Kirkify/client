import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { ProgramsQuery } from '../../../../state/programs/programs.query';
import { ProgramViewerService } from '../../services/program-viewer.service';
import { ProgramInterface } from '../../../../models/program.interface';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { SimpleMessageType } from '../../../../../../shared/modules/simple-message/models/simple-message.type';

@Component({
  selector: 'ch-program-viewer',
  templateUrl: './program-viewer.component.html',
  styleUrls: ['./program-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramViewerComponent implements OnInit {
  program: Observable<ProgramInterface>;
  errorMsg = new BehaviorSubject<SimpleMessageType>('');

  constructor(
    private route: ActivatedRoute,
    private query: ProgramsQuery,
    private service: ProgramViewerService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        this.errorMsg.next('');
        this.program = this.query.selectProgram(id);

        const entity = this.query.getProgram(id);

        if (!entity) {
          return this.service.selectProgram(id).pipe(
            catchError(err => {
              this.errorMsg.next(err);
              return throwError(err);
            })
          );
        } else {
          return EMPTY;
        }
      })
    ).subscribe();
  }

}
