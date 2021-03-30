import { styles } from './followSuggestionCard.css'
import AvatarSkeleton from '../AvatarSkeleton/AvatarSkeleton'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { CardHeader, Avatar } from '@material-ui/core';
import { List } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import React from 'react';
import FollowSuggestion from '../FollowSuggestion/FollowSuggestion';


export default function FollowSuggestionCard({ suggestedUsers, onFollowClick }) {
  const s = styles();
  const { t } = useTranslation(['feed', 'common']);

  const noOfSuggestions = 5;

  return (
    <Card elevation={2}>
      <CardHeader 
        title={t('artistsWeThinkYouWouldLike')} 
        titleTypographyProps={{ variant: "subtitle1"}}>
      </CardHeader>
      <CardContent>
        {!suggestedUsers?.isError ? (
          <List className={s.list} dense>
              {!suggestedUsers ? (
                <div>
                  <AvatarSkeleton></AvatarSkeleton>
                  <AvatarSkeleton></AvatarSkeleton>
                  <AvatarSkeleton></AvatarSkeleton>
                  <AvatarSkeleton></AvatarSkeleton>
                </div>
                ) : (
                suggestedUsers?.slice(0, noOfSuggestions).map((user) =>
                  <FollowSuggestion user={user} onFollowClick={onFollowClick}></FollowSuggestion>
                )
              )}
          </List>
        ) : (
          <p>Couldn't load recommended users...</p>
        )}
      </CardContent>
    </Card>  
  );
}