import { getRepository } from "typeorm";
import { CreatePostDto } from './../dto/CreatePostDto';
import { Post } from './../entities/Post';
import { User } from '../entities/User';

class PostService {
  private static instance: PostService;

  private constructor() {}

  static getInstance() {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return PostService.instance;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await getRepository(Post).find();
    return posts;
  }

  async getPost(id: number): Promise<Post> {
    const post = await getRepository(Post).findOne(id);
    if (!post) throw new Error('postNotFound [getPost]');
    return post;
  }

  async createPost(postDto: CreatePostDto): Promise<Post> {
    let post = new Post();

    post.title = postDto.title;
    post.text = postDto.text;
    const user = new User();
    user.id = postDto.authorId;
    post.author = user;

    post = await getRepository(Post).save(post);
    return post;
  }

  async updatePost(id: number, postDto: CreatePostDto): Promise<Post> {
    let post = await getRepository(Post).findOne(id);
    if (!post) throw new Error('postNotFound [updatePost]');

    post.title = postDto.title;
    post.text = postDto.text;
    const user = new User();
    user.id = postDto.authorId;
    post.author = user;

    post = await getRepository(Post).save(post);
    return post;
  }

  async deletePost(id: number): Promise<Post> {
    let post = await getRepository(Post).findOne(id);
    if (!post) throw new Error('postNotFound [deletePost]');

    await getRepository(Post).remove(post);
    return post;
  }

  async getPostsByAuthor(authorId: number): Promise<Post[]> {
    const posts = await getRepository(Post).find({ authorId });
    return posts;
  }
}

export default PostService.getInstance();
