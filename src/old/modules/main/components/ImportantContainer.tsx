import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from '../../../lib/components/Carousel/Carousel';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from '../styles/ImportantContainer.styles';
import {
  fetchImportantPosts,
  setImportantLoadingStatus,
} from '../store/mainSlice';
import { selectPostsByIds } from '../../../store/selectors';
import { ImportantPostPreviewCard } from '../../../../components/Posts/Cards/ImportantPostPreviewCard/ImportantPostPreviewCard';
import { LoadingContainer } from '../../../lib/components/Loading/LoadingContainer';

export const ImportantContainer: React.FC = () => {
  const classes = useStyles();
  const {
    importantPostIds,
    meta: { loading },
  } = useSelector((state: RootStateType) => state.main.important);
  const importantPosts = selectPostsByIds(importantPostIds);

  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchFetchAction = () => {
      dispatch(setImportantLoadingStatus());
      dispatch(fetchImportantPosts());
    };
    dispatchFetchAction();
  }, []);

  return (
    <div className={classes.container}>
      {loading === 'pending' ? (
        <LoadingContainer loading={loading} />
      ) : (
        <>
          <Carousel>
            {importantPosts.map((post) => (
              <ImportantPostPreviewCard post={post} key={post.title} />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};