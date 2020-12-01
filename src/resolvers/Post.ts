import { Resolver, Query, FieldResolver, Root } from "type-graphql";
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