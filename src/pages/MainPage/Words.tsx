import * as React from 'react';

import {Grid, CircularProgress, Typography} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination, Navigation} from 'swiper/core';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import {usegetWordsByTopicId} from 'redux/stores/words/wordSlice';

import useStyles from './styles';

SwiperCore.use([Pagination, Navigation]);

interface IWordsProps {
  topicId: string;
}

const Words: React.FC<IWordsProps> = ({topicId}) => {
  const classes = useStyles();

  const {data, isSuccess, isLoading, isError} = usegetWordsByTopicId(topicId);

  const words = data?.wordsByTopicId ?? [];

  return (
    <>
      {isError && <Alert severity="error">words: server error</Alert>}
      {isLoading && <CircularProgress color="secondary" />}
      {isSuccess && (
        <Grid container className={classes.swiperContainer}>
          <Swiper
            observer
            observeParents
            slidesPerView={1}
            pagination={{
              type: 'fraction',
            }}
            scrollbar={{draggable: true}}
            navigation
          >
            {words.map(item => (
              <SwiperSlide key={item.word}>
                <Grid container justify="center" alignItems="center" className={classes.slide}>
                  <Typography>{item.word}</Typography>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      )}
    </>
  );
};

export default React.memo(Words);
