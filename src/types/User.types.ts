export interface IUser {
    _id : string,
    name : string,
    email : string,
    password : String,
    profilePicture : string | undefined,
    coverPicture : string,
    bio : string,
    location : string,
    profession : string,
    DOB : string,
    website : string,
    createdAt : Date,
    followers : IUser[],
    following : IUser[],
    posts : [],
    bookmarks : []
}
