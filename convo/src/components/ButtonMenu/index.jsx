import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';

export default function ButtonMenu ({ icon, menuItems, id }) {
  const [anchor, setAnchor] = useState(null);
  const onClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const onClose = () => {
    setAnchor(null);
  };

  return (
    <Fragment>
      <IconButton id={id} onClick={onClick}>
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        PaperProps={{
          sx: {
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'borderColor'
          }
        }}
      >
        {menuItems && menuItems.map((item, index) => (
          <MenuItem key={`menu-item-${index}`}>
            {(item?.icon) && (
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
            )}
            {(item?.text) && (
              <Typography>
                {item.text}
              </Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}