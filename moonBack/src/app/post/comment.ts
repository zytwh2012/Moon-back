import {Post} from './post';

export class Comment {
    id: string | Int32Array;
    commentOwnerId: string;
    commentContent: object;
    lastEdited: number;
    tags: [string];
    children: [Comment];
    parent: [Comment|Post];
    root: Post;

    constructor(
        id: string | Int32Array,
        commentOwnerId: string,
        commentContent: object,
        lastEdited: number,
        tags: [string],
        children: [Comment],
        parent: Comment|Post,
        root: [Post],
    ) {}
}
