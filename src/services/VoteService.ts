import { getRepository } from 'typeorm';
import { Vote } from '../entities/Vote';
import { CreateVoteDto } from './../dto/CreateVoteDto';
import { User } from '../entities/User';
import { Post } from '../entities/Post';

class VoteService {
  private static instance: VoteService;

  private constructor() {}

  static getInstance() {
    if (!VoteService.instance) {
      VoteService.instance = new VoteService();
    }
    return VoteService.instance;
  }

  async getVotes(): Promise<Vote[]> {
    const votes = await getRepository(Vote).find();
    return votes;
  }

  async getVote(postId: number, userId: number): Promise<Vote> {
    const vote = await getRepository(Vote).findOne({ postId, userId });
    if (!vote) throw new Error('voteNotFound [getVote]');
    return vote;
  }

  async createVote(voteDto: CreateVoteDto): Promise<Vote> {
    let vote = new Vote();

    const user = new User();
    user.id = voteDto.userId;

    const post = new Post();
    post.id = voteDto.postId;

    vote.user = user;
    vote.post = post;
    vote.value = voteDto.value;

    vote = await getRepository(Vote).save(vote);
    return vote;
  }

  async updateVote(voteDto: CreateVoteDto): Promise<Vote> {
    const { postId, userId } = voteDto;
    let vote = await getRepository(Vote).findOne({ postId, userId });
    if (!vote) throw new Error('voteNotFound [updateVote]');

    vote.value = voteDto.value;

    vote = await getRepository(Vote).save(vote);
    return vote;
  }

  async deleteVote(postId: number, userId: number): Promise<Vote> {
    let vote = await getRepository(Vote).findOne({ postId, userId });
    if (!vote) throw new Error('voteNotFound [deleteVote]');

    vote = await getRepository(Vote).remove(vote);
    return vote;
  }

  async getVotesForPost(postId: number): Promise<Vote[]> {
    const votes = await getRepository(Vote).find({ postId });
    return votes;
  }

  async getVotesByAuthor(userId: number): Promise<Vote[]> {
    const votes = await getRepository(Vote).find({ userId });
    return votes;
  }
}

export default VoteService.getInstance();
