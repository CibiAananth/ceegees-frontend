import styled from 'styled-components';

import appColors from '../styles/colors';

// eslint-disable-next-line
export const InvalidMessage = styled.h5.attrs({
  color: props => props.color || appColors.invalid,
  size: props => props.size || '',
})`
  color: ${props => `${props.color} !important`};
  font-size: ${props => `${props.size} !important`};
  text-align: ${props => `${props.align === 'center' ? 'center' : ''}`};
`;
