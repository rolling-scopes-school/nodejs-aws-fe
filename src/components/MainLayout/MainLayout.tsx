import React from 'react';
import Container, { ContainerTypeMap } from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from 'components/MainLayout/components/Header';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            { 'Copyright © ' }
            <Link color="inherit" href="https://material-ui.com/">
                My Store
            </Link>{ ' ' }
            { new Date().getFullYear() }
            .
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: theme.spacing(8),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

type Props = Pick<ContainerTypeMap['props'], 'children'>;

const MainLayout = ({ children }: Props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Header />
            <main>
                <Container className={ classes.container } maxWidth="md">
                    { children }
                </Container>
            </main>
            <footer className={ classes.footer }>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Thank you for your purchase!
                </Typography>
                <Copyright />
            </footer>
        </React.Fragment>
    );
};

export default MainLayout;
