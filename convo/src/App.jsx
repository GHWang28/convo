import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import ChannelsPage from './pages/ChannelsPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import LoadingCover from './components/LoadingCover';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLogUserIn } from './redux/actions';
import { auth } from './firebase';
import { recordNewUser } from './firebase/database';

export default function App() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: 'rgb(192,192,192)'
      },
      trayColorBg: 'rgb(29, 32, 37)',
      trayTabColorBg: 'rgb(21, 24, 27)',
      iconColor: 'whitesmoke',
      trayFooterColor: 'rgb(53, 58, 68)',
      mode: 'dark',
    },
    typography: {
      allVariants: {
        color: 'whitesmoke'
      },
      fontFamily: '"Inter"'
    }
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  // Recording new user and redirecting to appropriate pages
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      recordNewUser(user)
        .then((data) => {
          navigate('/channels');
          dispatch(setLogUserIn({...data, uid: user.uid}));
        });
    }
  }, [user, navigate, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme='dark' position='bottom-right'/>
      <LoadingCover display={loading} />
      <Routes>
        <Route path='/' element={<LoginRegisterPage />} />
        <Route path='/channels' element={<ChannelsPage />} />
      </Routes>
    </ThemeProvider>
  )
}
