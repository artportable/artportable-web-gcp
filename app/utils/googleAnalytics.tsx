import * as gtag from '../../lib/gtag'

export enum ActionType { 
  LADDA_UPP_BILD_BEKRÄFTA = 'ladda_upp_bild_bekräfta', 
  LADDA_UPP_BILD_HEADER = 'ladda_upp_bild_header',
  LADDA_UPP_BILD_PROFIL = 'ladda_upp_bild_profil',
  FÖLJFÖRSLAG_MITT_KONSTNÄTVERK = 'följförslag_mitt_konstnätverk',
  FÖLJ_UPPTÄCK = 'följ_upptäck',
  FÖLJ_KONSTKORT = 'följ_konstkort',
  FÖLJ_PROFIL = 'följ_profil',
  KÖPFÖRFRÅGAN_MITT_KONSTNÄTVERK = 'köpförfrågan_mitt_konstnätverk',
  KÖPFÖRFRÅGAN_PORTFOLIE = 'köpförfrågan_heportfolie',
  GILLA_KONSTKORT = 'gilla_konstkort',
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