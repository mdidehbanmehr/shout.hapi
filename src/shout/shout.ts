export interface Shout {
    id: number;
    profilePicture?: string;
    email: string;
    author: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface CreateShout {
    id: number;
    profilePicture?: string;

    email: string;
    author: string;
    message: string;
}

export interface UpdateShout {
    author: string;
    profilePicture?: string;
    message: string;
    updatedAt: Date;
}