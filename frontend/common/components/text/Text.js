import
  styled
from 'styled-components';

import {
  colors,
  FontSizes,
} from 'common';

const HBase = props => `
  color: ${props.color || colors.black};
  ${props.fontFamily ? `font-family: ${props.fontFamily};` : ''}
  ${props.fontSize ? `font-size: ${props.fontSize};` : ''}
  ${props.fontStyle ? `font-style: ${props.fontStyle};` : ''}
  ${props.padding ? `padding: ${props.padding};` : ''}
  ${props.lineHeight ? `line-height: ${props.lineHeight};` : ''}
  ${props.textAlign ? `text-align: ${props.textAlign};` : ''}
  ${props.textDecoration ? `text-decoration: ${props.textDecoration};` : ''}
  ${props.onClick ? `cursor: pointer;` : ''}
  ${props.width ? `width: ${props.width};` : ''}
  ${props.whiteSpace ? `white-space: ${props.whiteSpace};` : ''}
`;

export const H1 = styled.h1`
  margin: ${props => props.margin ? props.margin : '0.8em 0'};
  ${props => HBase(props)}
`;

export const H2 = styled.h2`
  margin: ${props => props.margin ? props.margin : '0.8em 0'};
  ${props => HBase(props)}
`;

export const H3 = styled.h3`
  margin: ${props => props.margin ? props.margin : '0.6em 0'};
  ${props => HBase(props)}
`;

export const H3White = styled.h3`
  margin: ${props => props.margin ? props.margin : '0.6em 0'};
  ${props => HBase({
    color: colors.white,
    ...props,
  })}
`;

export const H4 = styled.h4`
  margin: ${props => props.margin ? props.margin : '0.4em 0'};
  ${props => HBase(props)}
`;

export const H4White = styled.h4`
  margin: ${props => props.margin ? props.margin : '0.4em 0'};
  ${props => HBase({
    color: colors.white,
    ...props,
  })}
`;

const PBase = styled.span`
  display:  ${props => props.display || 'inline-block'};
  color: ${props => props.color || colors.Black};
  line-height: ${props => props.lineHeight || '1.5'};
  ${props => props.border && `border: ${props.border};`}
  ${props => props.flex && `flex: ${props.flex};`}
  ${props => props.fontFamily && `font-family: ${props.fontFamily};`}
  ${props => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${props => props.fontStyle && `font-style: ${props.fontStyle};`}
  ${props => props.padding && `padding: ${props.padding};`}
  ${props => props.margin && `margin: ${props.margin};`}
  ${props => props.textAlign && `text-align: ${props.textAlign};`}
  ${props => props.textDecoration && `text-decoration: ${props.textDecoration};`}
  ${props => props.whiteSpace && `white-space: ${props.whiteSpace};`}
  ${props => props.overflow && `overflow: ${props.overflow};`}
  ${props => props.textOverflow && `text-overflow: ${props.textOverflow};`}
  ${props => props.width && `width: ${props.width};`}
  ${props => props.onClick && `cursor: pointer;`}
`;

export const P = styled(PBase)`
  font-size: ${FontSizes.Regular};
`;

export const PSmall = styled(PBase)`
  font-size: ${FontSizes.Small};
`;

export const PSmallWhite = styled(PBase)`
  color: ${props => props.color || colors.white};
  font-size: ${FontSizes.Small};
`;

export const PSmaller = styled(PBase)`
  font-size: ${FontSizes.Smaller};
`;

// General text component
export const Text = styled(PBase)`
  font-size: ${props => props.fontSize || FontSizes.Regular};
`;

export const TextWhite = styled(Text)`
  color: ${props => props.color || colors.white};
`;
