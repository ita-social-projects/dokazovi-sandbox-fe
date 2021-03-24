import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import {
  Box,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import ArticleEditor from '../../../lib/components/Editor/Editors/ArticleEditor';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import PageTitle from '../../../lib/components/Pages/PageTitle';
import { updatePost } from '../../../lib/utilities/API/api';
import { IDirection, IPost } from '../../../lib/types';
import PostCreationButtons from '../../postCreation/components/PostCreationButtons';
import { RootStateType } from '../../../store/rootReducer';
import { UpdateArticlePostRequestType } from '../../../lib/utilities/API/types';
import CheckboxDropdownFilterForm from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { PostPreviewLocationStateType } from '../../postCreation/components/PostPreviewWrapper';
import {
  CONTENT_DEBOUNCE_TIMEOUT,
  PREVIEW_DEBOUNCE_TIMEOUT,
} from '../../../lib/constants/editors';

export interface IArticleUpdationProps {
  post: IPost;
}

const ArticleUpdation: React.FC<IArticleUpdationProps> = ({ post }) => {
  const history = useHistory();
  const [selectedDirections, setSelectedDirections] = useState<IDirection[]>(
    post.directions,
  );
  const [htmlContent, setHtmlContent] = useState(post.content);
  const [preview, setPreview] = useState(post.preview);
  const [title, setTitle] = useState({
    value: post.title,
    error: '',
  });

  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const dispatchDirections = (checkedDirections: CheckboxFormStateType) => {
    const checkedIds = Object.keys(checkedDirections).filter(
      (key) => checkedDirections[key],
    );

    const directions: IDirection[] = allDirections.filter((direction) =>
      checkedIds.includes(direction.id.toString()),
    );

    setSelectedDirections(directions);
  };

  const dispatchHtmlContent = useCallback(
    _.debounce((content: string) => {
      setHtmlContent(sanitizeHtml(content) as string);
    }, CONTENT_DEBOUNCE_TIMEOUT),
    [],
  );

  const dispatchPreview = useCallback(
    _.debounce((value: string) => {
      setPreview(value);
    }, PREVIEW_DEBOUNCE_TIMEOUT),
    [],
  );

  const updatedPost: UpdateArticlePostRequestType = {
    id: post.id,
    content: htmlContent,
    directions: selectedDirections,
    preview,
    title: title.value,
    type: post.type,
  };

  const previewPost: IPost = {
    ...post,
    content: htmlContent,
    preview,
    directions: selectedDirections,
    title: title.value,
    type: post.type,
  };

  const sendPost = async () => {
    const response = await updatePost(updatedPost);
    history.push(`/posts/${response.data.id}`);
  };

  const goArticlePreview = () => {
    const state: PostPreviewLocationStateType = {
      actionType: 'update',
      postToSend: updatedPost,
      previewPost,
    };

    history.push(`/update-article/preview`, state);
  };

  return (
    <>
      <PageTitle title="Редагування статті" />

      {allDirections.length ? (
        <CheckboxDropdownFilterForm
          onFormChange={dispatchDirections}
          possibleFilters={allDirections}
          selectedFilters={selectedDirections}
          noAll
          maximumReached={selectedDirections.length === 3}
          filterTitle="Напрямки: "
        />
      ) : (
        <CircularProgress />
      )}
      <Box mt={2}>
        <Typography variant="h5">Заголовок статті: </Typography>
        <TextField
          error={Boolean(title.error)}
          helperText={title.error}
          fullWidth
          required
          id="article-name"
          value={title.value}
          onChange={(e) => {
            setTitle({ ...title, value: e.target.value });
          }}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="h5">Текст статті:</Typography>
        <ArticleEditor
          initialContent={htmlContent}
          initialPreview={preview}
          dispatchContent={dispatchHtmlContent}
          initialIsPreviewManuallyChanged
          dispatchPreview={dispatchPreview}
          previewPost={previewPost}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <PostCreationButtons
          publishPost={sendPost}
          goPreview={goArticlePreview}
        />
      </Box>
    </>
  );
};

export default ArticleUpdation;
