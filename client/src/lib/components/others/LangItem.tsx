import React from 'react';
import { Locale } from '../../i18n/config';

interface Props {
  locale: Locale;
}

const LangItem = ({ locale }: Props) => {
  const country = locale.split('-')[1];

  return (
    <div className="d-flex  justify-content-between">
      <h6 className="m-0">{country}</h6>
      <span
        style={{ width: '2.5rem', lineHeight: '1.3rem' }}
        className={`fi fi-${country.toLowerCase()}`}
      ></span>
    </div>
  );
};

export default LangItem;
