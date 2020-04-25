import { ResourceIssueBoards } from '../templates';
import {
  BaseServiceOptions,
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';

export interface ProjectIssueBoards extends ResourceIssueBoards {
  all(projectId: string | number, options?: PaginatedRequestOptions);

  create(projectId: string | number, name: string, options?: Sudo);

  edit(projectId: string | number, boardId: number, options?: BaseRequestOptions);

  editList(
    projectId: string | number,
    boardId: number,
    listId: number,
    position: number,
    options?: Sudo,
  );

  lists(projectId: string | number, boardId: number, options?: Sudo);

  remove(projectId: string | number, boardId: number, options?: Sudo);

  removeList(projectId: string | number, boardId: number, listId: number, options?: Sudo);

  show(projectId: string | number, boardId: number, options?: Sudo);

  showList(projectId: string | number, boardId: number, listId: number, options?: Sudo);
}

export class ProjectIssueBoards extends ResourceIssueBoards {
  constructor(options: BaseServiceOptions = {}) {
    super('projects', options);
  }

  createList(
    projectId: string | number,
    boardId: number,
    options?: Sudo & ({ assigneeId?: number } | { labelId?: number } | { milestoneId?: number }),
  ) {
    const [rId, bId] = [projectId, boardId].map(encodeURIComponent);

    return RequestHelper.post(this, `${rId}/boards/${bId}/lists`, options);
  }
}
