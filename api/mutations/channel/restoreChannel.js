// @flow
import type { GraphQLContext } from '../../';
import UserError from '../../utils/UserError';
import { getChannelById, restoreChannel } from '../../models/channel';
import { userCanManageChannel } from './utils';

export default async (
  _: any,
  { input: { channelId } }: { input: { channelId: string } },
  { user }: GraphQLContext
) => {
  if (await !userCanManageChannel(user.id, channelId)) {
    return new UserError('You don’t have permission to manage this channel');
  }

  const channel = await getChannelById(channelId);

  if (!channel.archivedAt) {
    return new UserError('Channel already restored');
  }

  return await restoreChannel(channelId);
};
