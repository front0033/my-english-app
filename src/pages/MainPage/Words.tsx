import * as React from 'react';

import { Grid, Typography, IconButton, CircularProgress } from '@material-ui/core';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import { Alert } from '@material-ui/lab';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper/core';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { useGetWordsByTopicIdQuery } from 'redux/stores/words/wordSlice';

import useStyles from './styles';

SwiperCore.use([Pagination, Navigation]);

interface IWordsProps {
  topicId: string;
}

const Words: React.FC<IWordsProps> = ({ topicId }) => {
  const classes = useStyles();
  const [showTranslate, setShowTranslate] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const { data, isSuccess, isLoading, isError } = useGetWordsByTopicIdQuery(topicId);

  const words = data || [];

  const habdleToggleTranslateClick = () => {
    setShowTranslate(!showTranslate);
  };

  const handleSliderChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
    setShowTranslate(false);
  };

  const goToGoogleTranslate = () => {
    const url = `https://translate.google.com/?hl=ru&sl=en&tl=ru&text=${words[activeIndex].word.trim()}`;
    window.open(url);
  };

  return (
    <>
      {isError && <Alert severity="error">words: server error</Alert>}
      {isLoading && (
        <Grid container direction="column" alignItems="center" className={classes.wordsContainer}>
          <Typography className={classes.progressCaption} variant="caption">
            Loading words...
          </Typography>
          <CircularProgress className={classes.progress} />
        </Grid>
      )}
      {isSuccess && !words.length && <Alert severity="info">Words are missing.</Alert>}
      {isSuccess && (
        <Grid container className={classes.wordsContainer}>
          <Swiper
            observer
            observeParents
            slidesPerView={1}
            pagination={{
              type: 'fraction',
            }}
            scrollbar={{ draggable: true }}
            navigation
            onSlideChange={handleSliderChange}
          >
            {words.map((item) => (
              <SwiperSlide key={item.word}>
                <Grid container direction="column" justify="space-around" alignItems="center" className={classes.slide}>
                  <Grid onClick={habdleToggleTranslateClick}>
                    <Typography color={showTranslate ? 'secondary' : 'primary'} variant="h5">
                      {showTranslate ? item.translate : item.word}
                    </Typography>
                    {showTranslate && item.example && <Typography variant="caption">{item.example}</Typography>}
                  </Grid>
                  <IconButton
                    className={classes.translateButton}
                    disabled={!words[activeIndex]}
                    onClick={goToGoogleTranslate}
                  >
                    <GTranslateIcon color="primary" />
                  </IconButton>
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
