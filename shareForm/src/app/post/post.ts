export class Post {
    id: string | Int32Array;
    postOwnerId: string;
    title: string;
    postContent: object;
    branch: string;
    lastEdited: number;
    tags: [string];
    comment: [string];

    constructor(
        id: string | Int32Array,
        postOwnerId: string,
        title: string,
        postContent: object,
        branch: string,
        lastEdited: number,
        tags: [string],
        comment: [string],
    ) {}
}
