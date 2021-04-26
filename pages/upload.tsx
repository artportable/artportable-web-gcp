import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Main from '../app/components/Main/Main'
import UploadForm from '../app/components/UploadForm/UploadForm';
import { useGetTags } from '../app/hooks/dataFetching/Artworks';
import styles from '../styles/upload.css'

export default function UploadArtworkPage() {
  const s = styles();

  const tags = useGetTags();

  return (
    <Main>
      <div className={s.mainGrid}>
        <div className={s.uploadBox}>
          <div>Drag your files here</div>
        </div>
        <div className={s.previewsContainer}>previews</div>
        <div className={s.form}>
          {tags.isLoading && <div>loading...</div>}
          {tags.isError && <div>error...</div>}
          {tags.data && !tags.isLoading && !tags.isError &&
            <UploadForm tags={tags.data}></UploadForm>
          }
        </div>
      </div>
    </Main>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      isSignUp: true,
      ...await serverSideTranslations(locale, ['upload']),
    }
  };
}
