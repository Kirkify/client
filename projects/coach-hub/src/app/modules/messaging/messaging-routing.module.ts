import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagingComponent } from './messaging.component';
import { MessagingRoutesEnum } from './messaging-routes.enum';
import { InboxComponent } from './components/inbox/inbox.component';
import { ThreadDetailComponent } from './components/thread-detail/thread-detail.component';
import { MessageCreatorComponent } from './components/message-creator/message-creator.component';


const routes: Routes = [
  {
    path: '',
    component: MessagingComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', pathMatch: 'full', redirectTo: MessagingRoutesEnum.Inbox },
      { path: MessagingRoutesEnum.Inbox, component: InboxComponent },
      { path: `${MessagingRoutesEnum.Inbox}/:id`, component: ThreadDetailComponent },
      { path: MessagingRoutesEnum.Create, component: MessageCreatorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagingRoutingModule { }
