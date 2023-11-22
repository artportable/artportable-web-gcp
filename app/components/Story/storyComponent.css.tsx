import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
    createStyles({
        story: {
            backgroundColor: '#ffffff',
            maxWidth: '100%',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            [theme.breakpoints.up('md')]: {
                maxWidth: '380px'
            },
            [theme.breakpoints.up('mdPlus')]: {
                maxWidth: '450px'
            },
            [theme.breakpoints.up('lg')]: {
                maxWidth: '290px'
            },
            [theme.breakpoints.up('lgPlus')]: {
                maxWidth:'350px'
            }
        },
        writerContainer: {
            display:'flex',
            padding:'10px',
            justifyContent:'center',
            alignItems:' center'
        },
        image: {
            maxWidth: '100%',
        },
        textTitle: {
            padding: '0 8% 8%',
            backgroundColor: '#ffffff',
            position: 'relative',
        },
        title: {
            textAlign: 'center',
            display: 'block',
            paddingTop: '20px',
            marginBottom: '20px',
            fontSize: '23px'
        },
        text: {
            textAlign: 'center',
            fontSize: '16px',
            lineHeight: '1.7em',
            textTransform: 'none',
            letterSpacing: '0px',
        },
        datePublished: {
            display: 'inline-block',
            position: 'absolute',
            top: -25,
            padding: '10px',
            width: '60px',
            height: '60px',
            boxSizing: 'border-box',
            borderRadius: '999px',
            textAlign: 'center',
            backgroundColor: '#000000',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            fontSize: '12px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontWeight: 700,
        },
        monthDay: {
            display: 'inline-block',
            textAlign: 'center',
        },
        month: {
            color: '#fefefe',
            fontSize: '12px',
        },
        day: {
            color: '#fefefe',
            fontSize: '18px',
            display: 'block',
        },

    })
)
