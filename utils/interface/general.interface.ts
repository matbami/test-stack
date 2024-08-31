export interface Pagination{
    page?: string
    limit?: string
}

export interface UserInterface{
    email: string
    username: string
    password: string
}

export interface LoginInterface{
    email: string
    password: string
}