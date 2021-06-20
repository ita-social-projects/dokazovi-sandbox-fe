import React, { useState } from 'react';
import { Grid, Typography, Link } from '@material-ui/core';
import { ExpertBlock } from './ExpertBlock';
import { useStyles } from '../../../modules/main/styles/MainExpertsView.styles';
import { ExpertPopover } from './ExpertPopover';
import { ExpertDataCard } from './ExpertDataCard';
import { IExpert, LoadingStatusEnum } from '../../types';
import { LoadingInfo } from '../Loading/LoadingInfo';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../../../locales/localizationInit';

const cardsClasses = Array.from(Array(11).keys()).map((el) => `item_${el}`);

export interface IExpertsViewCardProps {
  cards: IExpert[];
  loading?: LoadingStatusEnum;
  isOnDirection?: boolean;
}

export const ExpertsViewCard: React.FC<IExpertsViewCardProps> = (props) => {
  const { t } = useTranslation();

  const { cards, loading, isOnDirection } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [popoverCard, setPopoverCard] = useState<IExpert | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLDivElement>,
    card: IExpert,
  ) => {
    setPopoverCard(card);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const allExperts = cards.map((card, key) => (
    <div
      onMouseEnter={(event) => handlePopoverOpen(event, card)}
      onMouseLeave={handlePopoverClose}
      key={card.id}
      className={classes[cardsClasses[key]] as string}
    >
      <ExpertBlock expert={card} />
    </div>
  ));

  const errorMsg = t(langTokens.experts.expertsLoadingFail);

  return (
    <div className={classes.container}>
      {loading === 'pending' ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.loading}
        >
          <LoadingInfo loading={loading} errorMsg={errorMsg} />
        </Grid>
      ) : (
        <>
          {isOnDirection ? (
            <Typography variant="h4">{t(langTokens.common.experts)}</Typography>
          ) : (
            <Typography variant="h4">
              <Link href="/experts">{t(langTokens.common.experts)}</Link>
            </Typography>
          )}
          <div className={classes.experts}>
            {allExperts}
            <ExpertPopover
              anchorEl={anchorEl}
              handlePopoverClose={handlePopoverClose}
            >
              {popoverCard && <ExpertDataCard expert={popoverCard} />}
            </ExpertPopover>
          </div>
        </>
      )}
    </div>
  );
};
