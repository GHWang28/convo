import { Box, keyframes } from "@mui/material";
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
      <Box sx={{ width: 'fit-content', display: 'flex', animation: `${tickScroll} 20s linear infinite` }}>
        {([...images, ...images].map((src, index) => (
          <Box
            key={`img-scroll-${index}`}
            component='img'
            alt={`character-${index}-portrait`}
            src={process.env.PUBLIC_URL + src}
          />
        )))}
      </Box>
    </Box>
  )
}

ImageScroller.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ImageScroller;
