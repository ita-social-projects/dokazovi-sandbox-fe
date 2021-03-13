import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Box, Container, Toolbar, Typography } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from './Header.styles';
import { PostCreationMenu } from './PostCreationMenu';
import { LoginModal } from '../Users/LoginModal';
import { RootStateType } from '../../../store/rootReducer';
import { AccountMenu } from './AccountMenu';

interface IHeaderProps {
  id: string;
  label: string;
  url: string;
}

export const navElems: IHeaderProps[] = [
  {
    id: 'main',
    label: 'Головна',
    url: '/',
  },
  {
    id: 'materials',
    label: 'Матеріали',
    url: '/materials',
  },
  {
    id: 'experts',
    label: 'Автори',
    url: '/experts',
  },
];

const Header: React.FC = () => {
  const classes = useStyles();
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  return (
    <Container>
      <div id="header">
        <Toolbar className={classes.header}>
          <Box display="flex">
            <Link to="/">
              <Typography className={classes.logo} variant="h1">
                Доказові
              </Typography>
            </Link>

            <Typography className={classes.subtitle} variant="subtitle2">
              <span>Обгрунтовані</span>
              <span>медичні погляди</span>
            </Typography>
          </Box>

          <Box display="flex">
            <Link to="/" className={classes.community}>
              <Typography variant="body2">Про нашу спільноту</Typography>
            </Link>

            {user && (
              <div className={classes.postCreationMenu}>
                <PostCreationMenu />
              </div>
            )}

            <SearchIcon className={classes.search} fontSize="large" />

            {user ? <AccountMenu /> : <LoginModal />}
          </Box>
        </Toolbar>

        <Box className={classes.tabs}>
          {navElems.map((item) => (
            <NavLink to={item.url} key={item.id} className={classes.tab} exact>
              <Typography variant="body1" className={classes.tabLabel}>
                {item.label}
              </Typography>
            </NavLink>
          ))}
        </Box>
      </div>
    </Container>
  );
};

export default Header;
