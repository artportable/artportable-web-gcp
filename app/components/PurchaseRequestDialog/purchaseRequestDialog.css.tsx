import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme: Theme) =>
    createStyles({
        buttonContainer: {
            textAlign: 'center',
            marginTop: '2rem',
            marginBottom: '1rem',
            '& > button': {
                margin: theme.spacing(0.5)
            }
        },
        createAccount: {
            textAlign: 'center',
            paddingBottom: '2rem',
        },
        customTextOpen: {
            borderRadius: 'unset',
            borderBottom: '1px solid',
            padding: '0',
            margin: '2rem 0',
            fontWeight: 'normal',
        },
        form: {
            paddingTop: '2rem',
        },
        textField: {
            minHeight: '76px',
            marginBottom: '5px',
            '& label.Mui-focused': {
                color: 'black',
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    border: '1px solid black',
                },
            },
        },
        textFieldMultiline: {
            minHeight: '133px',
            '& label.Mui-focused': {
                color: 'black',
            },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    border: '1px solid black',
                },
            },
        },
        decorated: {
            overflow: 'hidden',
            textAlign: 'center',
            '& span': {
                position: 'relative',
                display: 'inline-block',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    borderBottom: '1px solid',
                    width: '100vw',
                    margin: '0 10px',
                    right: '100%',
                    borderColor: '#61616166',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    borderBottom: '1px solid',
                    width: '100vw',
                    margin: '0 10px',
                    left: '100%',
                    borderColor: '#61616166',
                }
            },
        },
        messageButton: {
            margin: '2rem 0',
        },
        sendMailTypo: {
            marginBottom: theme.spacing(3),
            fontWeight: 500
        },
        thanksTypo: {
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            fontWeight: 600,
            textAlign: 'center'
        },
    }),
);