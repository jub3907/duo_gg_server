export const PostQueueType = <const>[
  '솔로랭크',
  '자유랭크',
  '무작위총력전',
  '일반',
];

export type PostQueueType = typeof PostQueueType[number];
