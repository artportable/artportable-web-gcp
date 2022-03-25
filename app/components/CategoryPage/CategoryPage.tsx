import { Box, Link, Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Category } from '../../models/Category';
import Main from '../Main/Main';
import { styles } from './categoryPage.css';
import MuiButton from '@material-ui/core/Button'
import { NavBarItem } from '../../models/NavBarItem';

export default function CategoryPage({ category, navBarItems }: { category: Category, navBarItems: NavBarItem[] }) {
  const s = styles();
  const router = useRouter()
  const { t } = useTranslation(['articles']);
  const publicUrl = process.env.NEXT_PUBLIC_URL;
  const canonicalURL = publicUrl + router.asPath;

  {
    category.name === 'Artiklar' || category.name === 'Stories' ?
    <Typography className={s.categoryHeading} component="h1" variant={'h3'}>
      {t('latest')}
    </Typography>
    :
    <Typography className={s.categoryHeading} component="h3" variant={'h3'}>
      {category.name}<span className={s.underline}></span>
    </Typography>
  }

  return (
    <Main navBarItems={navBarItems}>
      <Head>
        <meta name="title" content={t('title')} />
        <meta name="description" content={t('description')} />
        <meta name="url" content="https://artportable.com/artiklar" />

        <link rel="canonical" href={canonicalURL} />
      </Head>
      {router.isFallback &&
        //implement good skeleton here
        <div>Loading...</div>
      }
      {!router.isFallback &&
        <>

          <div>
            <>
              <div className={s.categories}>
                {
                // category.name === 'Artiklar' || category.name === 'Stories' ?
                //   <Typography className={s.categoryHeading} component="h1" variant={'h3'}>
                //     {t('latest')}
                //   </Typography>
                //   :
                  category.name === 'Flerartiklar' || category.name === 'Morearticles' ?
                  <Typography className={s.categoryHeading} component="h1" variant={'h3'}>
                    {t('moreArticles')}
                  </Typography>
                  :
                <Typography className={s.categoryHeading} component="h3" variant={'h3'}>
                  {category.name}<span className={s.underline}></span>
                </Typography>
                }
              </div>
              <div className={s.menuFlex}>
                <Link className={s.link} href="/artiklar">
                  <MuiButton color="default" size="small">
                    {t('articles')}
                  </MuiButton>
                </Link>
                <Link className={s.link} href="/redaktionellt">
                  <MuiButton color="default" size="small">
                    {t('editorial')}
                  </MuiButton>
                </Link>
                <Link className={s.link} href="/konstnaersportraett">
                  <MuiButton color="default" size="small">
                    {t('artistPortrait')}
                  </MuiButton>
                </Link>
                <Link className={s.link} href="/flerartiklar">
                  <MuiButton color="default" size="small">
                    {t('moreArticlesMenu')}
                  </MuiButton>
                </Link>
              </div>
            </>
          </div>
          <div className={s.flex}>
            {category?.articles?.slice().sort((a, b) => a.published_at < b.published_at ? 1 : -1).map((article) => {
              if (article.published_at)
                return (
                  <div key={article.id} className={s.container}>
                        <div className={s.wrapper}>
                          {/* <img className={s.coverImage} src={article?.coverImage?.formats?.small?.url} /> */}
                          <div className={s.textContent}>
                            <div>
                              {article.published_at.slice(0, -14)}
                            </div>

                    <Link className={s.link} href={`/${category.name.toLowerCase().replace('konstnärsporträtt', 'konstnaersportraett')}/${article.slug}`}>
                      <a className={s.link}>
                            <Typography component="h2" variant={'h2'}>
                              <Box fontFamily="LyonDisplay" fontWeight="fontWeightMedium" className={s.headline}>
                                {article.title} {router.locale !== article.locale ? '(In Swedish)' : ''}
                              </Box>
                            </Typography>
                            <Typography variant={'subtitle1'}>{article.description}</Typography>
                      </a>
                    </Link>
                          </div>
                          <div className={s.line}></div>
                        </div>
                  </div>
                )
            })}
          </div>
        </>
      }
    </Main >
  );

}