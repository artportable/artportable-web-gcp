import * as gtag from '../../lib/gtag'

export enum ActionType { 
  LADDA_UPP_BILD_BEKRÄFTA = 'ladda_upp_bild_bekräfta', 
  LADDA_UPP_BILD_HEADER = 'ladda_upp_bild_header',
  LADDA_UPP_BILD_PROFIL = 'ladda_upp_bild_profil',
  LADDA_UPP_BILD_MITT_KONSTNÄTVERK = 'ladda_upp_bild_mitt_konstnätverk',
  FÖLJFÖRSLAG_MITT_KONSTNÄTVERK = 'följförslag_mitt_konstnätverk',
  FÖLJ_UPPTÄCK = 'följ_upptäck',
  FÖLJ_KONSTKORT = 'följ_konstkort',
  FÖLJ_PROFIL = 'följ_profil',
  KÖPFÖRFRÅGAN_DIALOG_STÄNG = "köpförfrågan_dialog_stäng",
  KÖPFÖRFRÅGAN_KONSTKORT = "köpförfrågan_konstkort",
  KÖPFÖRFRÅGAN_LISTNING = "köpförfrågan_listning",
  KÖPFÖRFRÅGAN_LISTNING_PROFIL = 'köpförfrågan_listning_profil',
  KÖPFÖRFRÅGAN_LISTNING_UPPTÄCK = 'köpförfrågan_listning_upptäck',
  KÖPFÖRFRÅGAN_MITT_KONSTNÄTVERK = 'köpförfrågan_mitt_konstnätverk',
  KÖPFÖRFRÅGAN_SKICKA_UTLOGGAD = 'köpförfrågan_skicka_utloggad',
  GILLA_KONSTKORT = 'gilla_konstkort',
  GILLA_PORTOFOLIE_UPPTÄCK = 'gilla_portfolie_upptäck',
  SIGN_UP_FREE = 'sign_up_free',
  SIGN_UP_PORTFOLIE = 'sign_up_portfolio',
  SIGN_UP_PREMIUM = 'sign_up_premium',
  SIGN_UP_KÖPFÖRFRÅGAN_FÖRE = 'sign_up_köpförfrågan_före',
  SIGN_UP_KÖPFÖRFRÅGAN_EFTER = 'sign_up_köpförfrågan_efter',
  SKICKA_MEDDELANDE = 'skicka_meddelande_profil',
  UPGRADE = 'upgrade_to_portfolio'
 }
 export enum CategoryType { 
  INTERACTIVE = 'interactive', 
  BUY = 'buy',
 }

interface GoogleAnalytics {
  action: ActionType,
  category?: CategoryType,
  label?: string,
  value?: string,
}

export function trackGoogleAnalytics ( action: ActionType, category?: CategoryType, label?: string, value?: string) {
  gtag.event({
    action, category, label, value
  })
}