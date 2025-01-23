import * as gtag from "../../lib/gtag";

export enum ActionType {
  UPLOAD_IMAGE_CONFIRM = "ladda_upp_bild_bekräfta",
  UPLOAD_IMAGE_HEADER = "ladda_upp_bild_header",
  UPLOAD_IMAGE_PROFILE = "ladda_upp_bild_profil",
  UPLOAD_IMAGE_FEED = "ladda_upp_bild_mitt_konstnätverk",
  FOLLOWING_SUGGESTION = "följförslag_mitt_konstnätverk",
  FOLLOW_DISCOVER = "följ_upptäck",
  FOLLOW_ARTWORK = "följ_konstkort",
  FOLLOW_PROFILE = "följ_profil",
  PURCHASE_REQUEST_DIALOG_CLOSE = "köpförfrågan_dialog_stäng",
  PURCHASE_REQUEST_ARTWORK = "köpförfrågan_konstkort",
  PURCHASE_REQUEST_LIST = "köpförfrågan_listning",
  PURCHASE_REQUEST_LIST_PROFILE = "köpförfrågan_listning_profil",
  PURCHASE_REQUEST_LIST_DISCOVER = "köpförfrågan_listning_upptäck",
  PURCHASE_REQUEST_FEED = "köpförfrågan_mitt_konstnätverk",
  PURCHASE_REQUEST_SEND_SIGNED_OUT = "köpförfrågan_skicka_utloggad",
  LIKE_ARTWORK = "gilla_konstkort",
  LIKE_PORTFOLIO_DISCOVER = "gilla_portfolie_upptäck",
  SIGN_UP_FREE = "sign_up_free",
  SIGN_UP_FREE_COMPLETED = "sign_up_free_completed",
  SIGN_UP_PORTFOLIE = "sign_up_portfolio",
  SIGN_UP_PORTFOLIE_COMPLETED = "sign_up_portfolio_completed",
  SIGN_UP_PREMIUM = "sign_up_premium",
  SIGN_UP_PREMIUM_COMPLETED = "sign_up_premium_completed",
  SIGN_UP_PURCHASE_REQUEST_BEFORE = "sign_up_köpförfrågan_före",
  SIGN_UP_PURCHASE_REQUEST_AFTER = "sign_up_köpförfrågan_efter",
  SEND_MESSAGE = "skicka_meddelande_profil",
  UPGRADE = "upgrade_to_portfolio",
  BECOME_MONTHLY_ARTIST = "bli_månadens_konstnär",
  GET_PORTFOLIO_PREMIUM = "skaffa_månadens_konstnär",
  UPGRADE_ACCOUNT_GOLD_BOTTOM = "uppgradera_konto_profil_guldknapp",
  SHOW_FIRST_PAGE_AD = "popup_annons_visad",
  CLICK_FIRST_PAGE_AD = "popup_annons_klickad",
  INVITE_FEED = "bjud in_feed",
  INVITE_PROFILE = "bjud in_profile",
  INVITE_HEADER = "bjud in_header",
  SHARE_ARTWORK = "dela konstverk",
  EXCLUSIVE_OFFER = "erbjudande min_ram",
}
export enum CategoryType {
  INTERACTIVE = "interactive",
  BUY = "buy",
}

interface GoogleAnalytics {
  action: ActionType;
  category?: CategoryType;
  label?: string;
  value?: string;
}

export function trackGoogleAnalytics(
  action: ActionType,
  category?: CategoryType,
  label?: string,
  value?: string
) {
  gtag.event({
    action,
    category,
    label,
    value,
  });
}
