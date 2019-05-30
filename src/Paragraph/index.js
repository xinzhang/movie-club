/* stylelint-disable value-no-vendor-prefix, property-no-vendor-prefix */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const breakpoints = ['40em', '52em', '64em'];

const screen = {
  sm: `@media screen and (min-width: ${breakpoints[0]})`,
  md: `@media screen and (min-width: ${breakpoints[1]})`,
  lg: `@media screen and (min-width: ${breakpoints[2]})`,
};

const paragraphStyles = css`
  font-family: ${props => props.theme.bodyFontFamily};
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  margin-top: 4px;
  margin-bottom: 4px;
  opacity: ${props => (props.transparent ? 0.6 : 1)};
`;

const ParagraphBase = styled.p.attrs(props => ({
  children: props.text,
}))`
  ${paragraphStyles}
`;

const MultiLineEllipsisBase = styled(ParagraphBase)`
  display: block; /* Fallback for non-webkit */
  display: -webkit-box;
  max-width: 100%;
  color: inherit;
  padding: 0;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const fontSize = ({ mobile, desktop }) => css`
  font-size: ${mobile};

  ${screen.md} {
    font-size: ${desktop};
  }
`;

const fontSizeEllipsis = ({ mobile, desktop }) => css`
  max-height: calc(${mobile} * ${props => props.lineHeight} * ${props => props.linesToShow} ); /* Fallback for non-webkit */
  font-size: ${mobile};
  line-height: ${props => props.lineHeight};
  -webkit-line-clamp: ${props => props.linesToShow};

  ${screen.md} {
    max-height: calc(${desktop} * ${props => props.lineHeight} * ${props => props.linesToShow} ); /* Fallback for non-webkit */
    font-size: ${desktop};
  }
`;

function getParagraphVariant({ variant }) {
  switch (variant) {
    case 'xl':
      return fontSize({ mobile: '16px', desktop: '18px' });
    case 'xl2':
      return fontSize({ mobile: '14px', desktop: '18px' });
    case 'l':
      return fontSize({ mobile: '14px', desktop: '16px' });
    case 'm':
      return fontSize({ mobile: '12px', desktop: '14px' });
    case 's':
      return fontSize({ mobile: '10px', desktop: '12px' });
    default:
      break;
  }
  return fontSize({ mobile: '12px', desktop: '14px' });
}

function getEllipsisVariant({ variant }) {
  switch (variant) {
    case 'xl':
      return fontSizeEllipsis({ mobile: '16px', desktop: '18px' });
    case 'xl2':
      return fontSizeEllipsis({ mobile: '14px', desktop: '18px' });
    case 'l':
      return fontSizeEllipsis({ mobile: '14px', desktop: '16px' });
    case 'm':
      return fontSizeEllipsis({ mobile: '12px', desktop: '14px' });
    case 's':
      return fontSizeEllipsis({ mobile: '10px', desktop: '12px' });
    default:
      break;
  }
  return fontSizeEllipsis({ mobile: '12px', desktop: '14px' });
}

const ParagraphWrapper = styled(ParagraphBase)`
  ${props => getParagraphVariant(props)};
`;

const MultiLineEllipsis = styled(MultiLineEllipsisBase)`
  ${props => getEllipsisVariant(props)};
`;

function Paragraph(props) {
  if (props.linesToShow) {
    return <MultiLineEllipsis {...props}>{props.text || props.children}</MultiLineEllipsis>;
  }
  return <ParagraphWrapper {...props}>{props.text || props.children}</ParagraphWrapper>;
}

Paragraph.propTypes = {
  /** informs which element style tovariant) */
  variant: PropTypes.oneOf(['xl', 'xl2', 'l', 'm', 's', 'xs']),
  /** text */
  text: PropTypes.string,
  children: PropTypes.node,  
  /** whether the text is 60% transparent or not */
  transparent: PropTypes.bool,
  /** If the ellipsis is required, inform the number of lines to show */
  linesToShow: PropTypes.number,
  /** If the ellipsis is required, inform the lineHeight */
  lineHeight: PropTypes.number,
};

Paragraph.defaultProps = {
  variant: 'm',
  text: null,
  transparent: false,
  linesToShow: null,
  lineHeight: 1.2,
  children: null,
};

export default Paragraph;
export { paragraphStyles };
