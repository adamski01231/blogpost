import { CreatePostDto } from './../dto/CreatePostDto';
import { Resolver, Query, FieldResolver, Root, Arg, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import VoteService from "../services/VoteService";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async posts() {
    const posts = await PostService.getPosts();
    return posts;
  }

  @Query(() => Post)
  async post(@Arg('id') id: number) {
    const post = await PostService.getPost(id);
    return post;
  }

  @Mutation(() => Post)
  async createPost(@Arg('input') postDto: CreatePostDto) {
    const post = await PostService.createPost(postDto);
    return post;
  }

  @FieldResolver()
  async author(@Root() post: Post) {
    const author = await UserService.getUser(post.authorId);
    return author;
  }

  @FieldResolver()
  async votes(@Root() post: Post) {
    const votes = await VoteService.getVotesForPost(post.id);
    return votes;
  }
}