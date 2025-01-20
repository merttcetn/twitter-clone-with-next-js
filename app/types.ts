export interface PostProps extends Post {
    isSelected?: boolean;
    onClick?: () => void;
}

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
