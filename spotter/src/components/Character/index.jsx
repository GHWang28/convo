import types from './types.json';
import { rng } from '../../helpers'
import { Box } from '@mui/material';

function Character ({ characterID = -1}) {
  if (characterID < 0) characterID = rng(0, types.characters.length - 1);

  return (
    <Box 
      component='img'
      width='100%'
      height='100%'
      src={process.env.PUBLIC_URL + types.characters[characterID]}
      alt={`character-${characterID}`}
    />
  )
}

export default Character;
