import { Card, Box, Typography, CardMedia } from '@material-ui/core';
import React from 'react';
import { useStyles } from '../styles/PostViewInfo.styles';
import { IPost } from '../../../lib/types';
import PostDirectionLink from '../../../lib/components/PostDirectionLink';

export interface IPostViewProps {
  post: IPost;
}

const PostView: React.FC<IPostViewProps> = ({ post }) => {
  const classes = useStyles();
  const authorFullName = `${post.author.firstName} ${post.author.lastName}`;
  const postContent = post.content ? post.content : 'There is no post content';

  return (
    <Card className={classes.cardContainer}>
      <Box className={classes.authorBlock}>
        <Box>
          <CardMedia
            style={{ padding: '15px', height: '58px', width: 46 }}
            className={classes.avatar}
            image={post?.author.avatar}
            title={authorFullName}
            component="div"
          />
        </Box>
        <Box>
          <Typography align="left" variant="h3" component="h3">
            {authorFullName}
          </Typography>
          <Typography
            align="left"
            variant="subtitle1"
            component="h3"
            style={{ padding: '5px' }}
          >
            {post.author.mainInstitution?.city.name},{' '}
            {post.author.mainInstitution?.name}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.contentRoot}>
        {post.title && (
          <Typography variant="h1" className={classes.title}>
            {post.title}
          </Typography>
        )}
        <Typography className={classes.createdAt} variant="overline">
          {post.createdAt}
        </Typography>
        <Typography variant="overline">
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: postContent,
            }}
          />
        </Typography>
      </Box>
    </Card>
  );
};

export default PostView;
