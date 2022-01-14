import {Checkbox, Dialog, DialogContent, FormGroup, FormControlLabel, TextField, Typography} from '@material-ui/core';
import { useContext, useEffect, useState} from 'react';
import Button from '../Button/Button';
import { styles } from "./purchaseRequestDialog.css";
import { useTranslation } from "next-i18next";
import { useKeycloak } from '@react-keycloak/ssr';
import type { KeycloakInstance } from 'keycloak-js';
import { useRouter } from "next/router";

export default function PurchaseRequestDialog({open, onClose, props}) {
    const { t } = useTranslation(['art', 'common']);
    const s = styles();
    const { keycloak } = useKeycloak<KeycloakInstance>();
    const router = useRouter();
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [messageResponse, setMessageResponse] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [signUpRedirectHref, setSignUpRedirectHref] = useState('');

    const onPurchaseRequestClick = async () => {
        if(userEmail){
            // api anrop för att maila/skicka meddelande
            const response = await fetch(`${apiBaseUrl}/api/messages/purchaserequest?email=${userEmail}&message=${customMessage}&artworkurl=${props.url}&artworkName=${props.title}&artistId=${props.referTo}`, {
                method: 'GET',
              });
              setMessageResponse(response.status.toString())
        }
    }

    const onCloseClick = () => {
        onClose();
        setMessageResponse('');
    }

    useEffect(() => {
        if(props){
            const isDefaultLocale = router.locale == router.defaultLocale;
            const artwork = encodeURIComponent(JSON.stringify({
                  title: props.title,
                  creator: props.creator,
                  url: props.url
                }));
            const redirectHref = `${window.origin}${isDefaultLocale ? '' : `/${router.locale}`}/${props.pathname}?artwork=${artwork}`
            setSignUpRedirectHref(redirectHref);
        }
    }, []);

    

    return (
        <Dialog open={open} onClose={onCloseClick}>
            {messageResponse
            ?
                <DialogContent>
                     <Typography variant="h3">
                        {messageResponse=='200' ?
                            t('thanksForInterestTitle')
                        :
                            t('somethingWentWrongTitle')
                        }
                    </Typography>

                    {messageResponse=='200' ?
                        t('thanksForInterestText')
                    :
                        t('somethinWentWrongText')
                    }
                    <div className={s.buttonContainer}>
                        <Button
                            variant="outlined" 
                            color="primary"
                            disableElevation 
                            rounded
                            onClick={onCloseClick}
                        >
                            {t('common:words.close')}
                        </Button>
                        <Button
                            variant="contained" 
                            color="primary"
                            disableElevation    
                            rounded
                            onClick={() => keycloak.register({
                                locale: router.locale,
                                redirectUri: signUpRedirectHref})}
                        >
                            {t('createAccountToChat')}
                        </Button>
                    </div>
                </DialogContent>
            :
                <DialogContent>
                    <div className={s.createAccount}>
                        <Button
                            variant="outlined" 
                            color="primary"
                            disableElevation    
                            rounded
                            onClick={() => keycloak.register({
                                locale: router.locale,
                                redirectUri: signUpRedirectHref})}
                        >
                            {t('createAccountToChat')}
                        </Button>
                    </div>
                    <Typography className={s.decorated}>
                        <span>
                            {t('common:words.or')}
                        </span>
                    </Typography>
                    <form className={s.form}>
                        <Typography>
                            {t('getEmailFromArtist')}
                        </Typography>
                        <TextField
                            fullWidth
                            label={t('common:words.email')}
                            placeholder={t('emailPlaceholder')}
                            onChange={(e) => setUserEmail(e.target.value)}
                        >
                        </TextField>
                        <TextField
                            fullWidth
                            multiline
                            label={t('common:messageOptional')}
                            placeholder={t('messagePlaceholder')}
                            onChange={(e) => setCustomMessage(e.target.value)}
                        >
                        </TextField>
                        <FormGroup>
                            <Button
                                variant="contained" 
                                color="primary"
                                disableElevation 
                                rounded
                                className={s.messageButton}
                                onClick={onPurchaseRequestClick}
                            >
                                {t('SendPurchaseRequest')}
                            </Button>
                        </FormGroup>
                    </form>
                </DialogContent>
            }
        </Dialog>
    );
}