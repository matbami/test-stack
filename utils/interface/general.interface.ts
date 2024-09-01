export interface Pagination{
    page?: string
    limit?: string
}

export interface UserInterface{
    email: string
    username: string
    password: string
}

export interface QuestionInterface{
    title: string
    body: string,
    userId: string
}

export interface AnswerInterface{
    body: string,
    questionId: string
   
}

export interface RatingInterface{
    targetType: string,
    targetId: string,
    userId: string
    value: string
   
}

export interface SubscriptionInterface{

    userId: string,
    questionId: string
   
   
}

export interface AnswerUpdateInterface{
    body?: string,
   
}

export interface QuestionUpdateInterface{
    title?: string
    body?: string,
}

export interface LoginInterface{
    email: string
    password: string
}