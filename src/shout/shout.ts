export interface Shout {
    id: number;
    profilPicture?: string;
    email: string;
    author: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface CreateShout {
    id: number;
    profilPicture?: string;

    email: string;
    author: string;
    message: string;
}

export interface UpdateShout {
    author: string;
    profilPicture?: string;
    message: string;
    updatedAt: Date;
}