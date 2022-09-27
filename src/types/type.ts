export type PostType = {
    id: number,
    src: string,
    massage: string | null,
    // lastPostsId?: any
}
export type ContactsTyp = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType ={
    small?: string | null
    large?: string | null
}

export type ProfileType = {
    userId?: number
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    aboutMe?: string
    status?: string
    contacts?: ContactsTyp
    photos?: PhotosType
    posts?: Array<PostType>

}
export type UsersType={
    name: string
    id: number
    uniqueUrlName: string
    photos: PhotosType
    status: string
    followed:boolean
}