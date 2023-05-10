import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme: Theme) => 
    createStyles({
        writePostButton: {
            color: '#FFFFFF',
            backgroundColor: '#000000',
            marginTop: '8px',
            textTransform: "uppercase",
            fontSize: '12px',
            borderRadius: '5px',
            padding: '6px',
        },
        dialogContainer: {
            '& .MuiDialog-container': {
                marginRight: 'auto',
                marginLeft: 'auto',
                '& .MuiPaper-root': {
                    width: '100%',
                    maxWidth: '660px',
                    height: '100%',
                    maxHeight: '450px',
                    '& .MuiDialogContent-root': {
                        padding: '18px',
                    }
                }
            }
        },
        contentHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        profileImageName: {
            display: 'flex',
            flexDirection: 'row',
            '& .MuiBox-root': {
                marginLeft: '14px',
                '& .MuiTypography-root': {
                    fontSize: '16px',
                }
            }
        },
        actionsContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '374px',
            padding: '8px 0px 0px 0px',
            '& .raf-textarea': {
                marginBottom: '10px',
            }
        },
        textareaContainer: {
        },
        buttonPublish: {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            '& .MuiButton-root': {
                color: '#FFFFFF',
                backgroundColor: '#000000',
                marginRight: '4px',
                padding: '4px 16px',
            }
        },
        closeButton: {
            borderRadius: '50%',
            padding: 0,
            backgroundColor: '#000000',
            color: '#FFFFFF',
            minWidth: '28px',
            maxWidth: '28px',
            height: '28px',
            '& .MuiButton-label': {
                width: 'auto',
            }
        },

        [theme.breakpoints.up("md")]: {
            dialogContainer: {
            }
        },

        [theme.breakpoints.up("mdPlus")]: {
            dialogContainer: {
                '& .MuiDialog-container': {
                    width: '100%',
                    maxWidth: '660px',
                }
            },
        },
    }))