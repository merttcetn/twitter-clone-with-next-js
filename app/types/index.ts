export interface Post {
    id: string;
    username: string;
    name: string;
    content: string;
    timestamp: string;
    likes: number;
    reposts: number;
    comments: Comment[];
    tags: string[];
    images?: string[];
}

export interface PostProps extends Post {
    isSelected: boolean;
    onPostClick: (id: string) => void;
}

export interface Comment {
    username: string;
    content: string;
    timestamp: string;
}
