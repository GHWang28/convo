import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import BootstrapTooltip from '../BootstrapTooltip';

export default function ButtonMenu ({
  icon,
  menuItems,
  children,
  id,
  sx,
  size,
  title,
  anchorOrigin,
  transformOrigin,
  onClose
}) {
  const [anchor, setAnchor] = useState(null);
  const onClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const onCloseHandler = () => {
    setAnchor(null);
    if (onClose) onClose();
  };

  const button = (
    <IconButton id={id} onClick={onClick} sx={sx} size={size}>
      {icon}
    </IconButton>
  )

  return (
    <Fragment>
      {(title) ? (
        <BootstrapTooltip title={title} placement='top'>
          {button}
        </BootstrapTooltip>
      ) : (
        button
      )}
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={onCloseHandler}
        MenuListProps={{
          'aria-labelledby': id,
          disablePadding: Boolean(children)
        }}
        PaperProps={{
          sx: {
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'borderColor',
          }
        }}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      >
        {children ? (
          children({ onClose: onCloseHandler })
        ) : (
          menuItems && menuItems.map((item, index) => (
            <MenuItem key={`menu-item-${index}`} onClick={item?.onClick}>
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
          ))
        )}
      </Menu>
    </Fragment>
  )
}