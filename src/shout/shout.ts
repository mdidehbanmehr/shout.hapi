export interface Shout {
    id: number;
    email: string;
    author: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface CreateShout {
    id: number;
    email: string;
    author: string;
    message: string;
}

export interface UpdateShout {
    author: string;
    message: string;
    updatedAt: Date;
}