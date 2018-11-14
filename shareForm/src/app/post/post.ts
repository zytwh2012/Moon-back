export interface Post {
    id: Number;
    postOwner_id: Number;
    parent_post: Number;
    child_post: Number;
    postContent: String;
    title: String;
    branch: String;
    lastEdited: Date;
}
