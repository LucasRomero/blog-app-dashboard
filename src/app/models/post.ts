export interface Post {
  title: string;
  permalink: string;
  category: {
    categoryId: string;
    category: string;
  };
  postImgPath: string;
  exceprt: string;
  content: string;
  isFeatured: boolean;
  views: number;
  status: string;
  createAt: Date;
}
