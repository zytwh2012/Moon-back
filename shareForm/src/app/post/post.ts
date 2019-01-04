export class Post {
    id: string | Int32Array;
    postOwner_id: string;
    title: string;
    postContent: object;
    branch: string;
    lastEdited: number;
    tags: [string];
    comment: [number];

    constructor(
        id: string | Int32Array,
        postOwner_id: string,
        title: string,
        postContent: object,
        branch: string,
        lastEdited: number,
        tags: [string],
        comment: [number],
    ) {}
}
