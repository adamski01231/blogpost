import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { Vote } from './../entities/Vote';
import VoteService from '../services/VoteService';
import UserService from '../services/UserService';
import PostService from '../services/PostService';

@Resolver(Vote)
export class VoteResolver {
  @Query(() => [Vote])
  async votes() {
    const votes = await VoteService.getVotes();
    return votes;
  }

  @FieldResolver()
  async user(@Root() vote: Vote) {
    const user = await UserService.getUser(vote.userId);
    return user;
  }

  @FieldResolver()
  async post(@Root() vote: Vote) {
    const post = await PostService.getPost(vote.postId);
    return post;
  }
}
