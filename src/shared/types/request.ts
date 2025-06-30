export type Request = {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
};

export type RequestInfo = Omit<Request, 'id' | 'createdAt'>;

export const CATEGORIES = ['IT', 'HR', 'Finance'];
