import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import PostList from '../../../lib/components/PostsList';
import {
  fetchInitialMaterials,
  fetchMaterials,
  setPostFilters,
} from '../store/directionSlice';
import { RootStateType } from '../../../store/rootReducer';
import { useStyles } from './styles/MaterialsContainer.styles';
import { FilterTypeEnum, IDirection } from '../../../lib/types';
import LoadingInfo from '../../../lib/components/LoadingInfo';
import useEffectExceptOnMount from '../../../lib/hooks/useEffectExceptOnMount';
import { PostTypeFilter } from './PostTypesFilter';
import { PostTagsFilter } from './PostTagsFilter';
import { selectPostsByIds } from '../../../store/selectors';
import LoadMorePostsButton from '../../../lib/components/LoadMorePostsButton';

interface IMaterialsContainerProps {
  direction: IDirection;
}

const MaterialsContainer: React.FC<IMaterialsContainerProps> = ({
  direction,
}) => {
  const classes = useStyles();

  const {
    postIds,
    meta: { loading, isLastPage, pageNumber },
    filters,
  } = useSelector(
    (state: RootStateType) => state.directions[direction.name].materials,
  );
  const materials = selectPostsByIds(postIds);

  const dispatch = useDispatch();

  const dispatchFetchAction = () => dispatch(fetchMaterials(direction));

  useEffect(() => {
    dispatch(fetchInitialMaterials(direction));
  }, [filters, direction]);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffectExceptOnMount(() => {
    if (pageNumber > 0) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pageNumber]);

  const setFilters = (checked: string[], directionName: string) => {
    dispatch(
      setPostFilters({
        key: FilterTypeEnum.POST_TYPES,
        filters: {
          value: checked,
        },
        directionName,
      }),
    );
  };

  useEffect(() => {
    return () => {
      setFilters([], direction.name);
      dispatch(
        setPostFilters({
          key: FilterTypeEnum.TAGS,
          filters: {
            value: [],
          },
          directionName: direction.name,
        }),
      );
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4">Матеріали</Typography>
      <PostTypeFilter
        directionName={direction.name}
        dispatchFunction={setFilters}
      />
      <PostTagsFilter directionName={direction.name} />
      <Grid container spacing={2} direction="row" alignItems="center">
        <PostList postsList={materials} />
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.loading}
      >
        <LoadingInfo loading={loading} />
      </Grid>
      <Grid container direction="column" alignItems="center" ref={gridRef}>
        <LoadMorePostsButton
          clicked={dispatchFetchAction}
          isLastPage={isLastPage}
          loading={loading}
        />
      </Grid>
    </Container>
  );
};

export default MaterialsContainer;
