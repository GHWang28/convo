import React from 'react';
import { Link } from '@mui/material';
import Linkify from 'linkify-react';
import BootstrapTooltip from '../BootstrapTooltip';
import PropTypes from 'prop-types';

export default function LinkifyWrapper ({ children }) {
  return (
    <Linkify
      options={{ render: ({ attributes, content }) => {
        // Adds links to text that are potentially links
        const { href, ...props } = attributes;
        return (
          <BootstrapTooltip title={`Go to external page.`} placement='top'>
            <Link href={href} target='_blank' {...props}>{content}</Link>
          </BootstrapTooltip>
        )
      }}}
    >
      {children}
    </Linkify>
  )
}

LinkifyWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
