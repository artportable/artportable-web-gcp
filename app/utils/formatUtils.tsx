const excludedCurrencyCodes = ["SEK", "NOK", "DKK"];

function getFormatter(
  languageCode: string,
  currency: string | null
): Intl.NumberFormat {
  if (currency === null) {
    return new Intl.NumberFormat(languageCode, {
      style: "currency",
      currency: "SEK",
      currencyDisplay: "code",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  if (languageCode === "sv") {
    return new Intl.NumberFormat("sv", {
      style: "currency",
      currency: currency,
      currencyDisplay: "code",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      currencyDisplay: "code",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}

function getPriceFormatter(artwork, languageCode) {
  const formatter = getFormatter(languageCode, artwork.Currency);

  let priceFormatter = {
    format: (value: number) => formatter.format(value),
  };

  if (artwork.Currency && !excludedCurrencyCodes.includes(artwork.Currency)) {
    priceFormatter = {
      format: (value: number) => formatter.format(value),
    };
  } else {
    priceFormatter = {
      format: (value: number) => `${value} ${artwork.Currency || "SEK"}`,
    };
  }

  return priceFormatter
}

export {
  getPriceFormatter,
}