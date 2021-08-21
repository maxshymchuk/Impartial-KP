export const BLOCK_CLASS = 'impartialkp-overlay';

export const defaults = {
  BLOCK_TYPE: 0,
  COLOR: '#FF0000',
  BLUR: 10,
  ACTION_TYPE: 0,
  TRANSITION: 300,
  IS_REVIEWS: true,
}

export const storage = {
  BLOCK_TYPE: 'impartialkp-block-type',
  COLOR: 'impartialkp-color',
  BLUR: 'impartialkp-blur',
  ACTION_TYPE: 'impartialkp-action',
  TRANSITION: 'impartialkp-transition',
  IS_REVIEWS: 'impartialkp-reviews',
}

export const reviewsQueries = {
  '^kinopoisk.ru/film/+': [
    'div[class*=styles_criticRatingSection]',
    'div[class*=styles_additionalInformationSection] > div:nth-child(9)',
    'div[class*=styles_additionalInformationSection] > div:nth-child(10)',
    'div[class*=styles_md_5] > nav',
  ]
}

export const ratingQueries = {
  '^kinopoisk.ru/+': [
    '.carousel__item *[class*=film-rating-bar]',
    '.block_show u',
    '.block_top250 u',
    '.selection-film-item-poster__rating',
    '.rating *[class*=rating_ball]',
    '.kpRating i',
    '.imdb',
    '.rating__value',
    '.kinopoisk-header-suggest-item__title-container *[class*=styles_rating]',
    '.kinopoisk-header-suggest-item__title-container > div > div > div:first-child',
    '.preview-card-film__rating'
  ],
  '^kinopoisk.ru/mykp/+': [
    '.filmsListShort .percent',
  ],
  '^kinopoisk.ru/user/+': [
    '.profileFilmsList .rating b',
  ],
  '^kinopoisk.ru/afisha/+': [
    '.schedule-film__rating-value',
  ],
  '^kinopoisk.ru/film/+': [
    '*[class*=styles_carousel] *[class*=styles_ratingPosterNameplate]',
    '.rating__value',
    'div[class*=styles_basicInfoSection] .film-rating .film-rating-value',
    'div[class*=styles_filmRatingSection] .film-rating .film-rating-value',
    '.film-sub-rating *:first-child',
    '.film-rate-form',
    'div[class*=styles_sidebar] *[class*=styles_averageVoteCount]',
    'div[class*=styles_sidebar] *[class*=styles_rootVote]',
  ],
  'hd.kinopoisk.ru/film/+': [
    'div[class*=Rate__tag] span:first-child',
  ]
}
