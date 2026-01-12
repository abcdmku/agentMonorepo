export interface AuthContext {
    userId: string | null;
    role: 'admin' | 'user' | 'guest';
    sessionId?: string;
}
