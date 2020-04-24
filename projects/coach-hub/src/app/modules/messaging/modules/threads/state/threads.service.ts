import { Injectable } from '@angular/core';
import { MessagingService } from '../../../services/messaging.service';


@Injectable({ providedIn: 'root' })
export class ThreadsService {

  constructor(
    private service: MessagingService
  ) {
  }
}
