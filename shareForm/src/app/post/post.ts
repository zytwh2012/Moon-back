export interface Post {
    id: Number;
    postOwner_id: Number;
    parent_post: Number;
    child_post: Number;
    postContent: Object;
    title: String;
    branch: String;
    lastEdited: Date;
    tags: [String];
}
