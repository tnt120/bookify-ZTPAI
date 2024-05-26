import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input({ required: true })
  comment!: Comment;

  @Input()
  userComment = false;

  @Output()
  editEmitter = new EventEmitter();

  @Output()
  deleteEmitter = new EventEmitter();

  onEdit() {
    this.editEmitter.emit();
  }

  onDelete() {
    this.deleteEmitter.emit();
  }
}
