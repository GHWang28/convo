import { Box, keyframes, Link, Typography } from "@mui/material";
import PropTypes from 'prop-types';

const tickScroll = keyframes`
  0% {
    translate: 0% 0%;
  }
  100% {
    translate: -50% 0%;
  }
`;

function ImageScroller ({ images }) {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Box sx={{ width: 'fit-content', display: 'flex', animation: `${tickScroll} 15s linear infinite`, height: '16vh' }}>
        {([...images, ...images].map((src, index) => (
          <Box
            key={`img-scroll-${index}`}
            component='img'
            alt={`character-${index}-portrait`}
            src={process.env.PUBLIC_URL + src}
          />
        )))}
      </Box>
      {/* Attributions */}
      <Typography fontWeight={'bold'} mt={0.2} fontSize={13} color='whitesmoke' align='center'>
      <em>{'Spotter'}</em>{' developed by '}
        <Link href='https://ghwang28.github.io/' target='_blank'>Gordon Wang</Link>
        {'.'}
        <br/>
        {'Character Art by '}
        <Link href='https://twitter.com/pablostanley' target='_blank'>Pablo Stanley</Link>
        {' and generated using '}
        <Link href='https://fangpenlin.com/' target='_blank'>Fang-Pen Lin</Link>
        {'\'s '}
        <Link href='https://getavataaars.com/' target='_blank'>Avataaars Generator</Link>
        {'.'}
      </Typography>
    </Box>
  )
}

ImageScroller.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ImageScroller;
