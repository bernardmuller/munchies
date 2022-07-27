import styled from 'styled-components';
import { colors, FontSizes } from 'common';
import { Loader } from '../loader';

const ButtonBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width || '60%'};
  height: ${props => props.height || '2.5rem'};
  border-radius: ${props => props.borderRadius || '6px'};
  font-size: ${props => props.fontSize};
  transition: transform 100ms ease-in-out;
  margin: ${props => props.margin || ''};
  box-shadow: ${props =>
    props.disabled ? ' ' : 'rgba(104, 191, 80, 0.50) 0px 5px 15px'};
  align-self: ${props => props.alignSelf || ''};
  justify-self: ${props => props.justifySelf || ''};
  gap: ${props => props.gap || '1rem'};

  &:hover {
    cursor: ${props => (props.disabled ? '' : 'pointer')};
  }
`;

const Primary = styled(ButtonBase)`
  color: ${props => (props.disabled ? `${colors.white}` : `${colors.white}`)};
  border: ${colors.white};
  background-color: ${props =>
    props.disabled ? `${colors.disabled}` : `${colors.primary}`};

  &:hover {
    cursor: ${props => (props.disabled ? '' : 'pointer')};
    background-color: ${props =>
      props.disabled ? colors.disabled : colors.primary_light};
  }

  &:active {
    background-color: ${props => (props.disabled ? '' : colors.primary_dark)};
  }
`;

const Secondary = styled(ButtonBase)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  border: none;
  font-size: ${props => props.fontSize};
  box-shadow: none;

  color: ${props =>
    props.disabled ? `${colors.white}` : `${colors.secondary}`};
  border: ${props => (props.disabled ? `${colors.black}` : `${colors.white}`)};
  background-color: ${props =>
    props.disabled ? `${colors.grey_light}` : `${colors.white}`};

  &:hover {
    cursor: ${props => (props.disabled ? '' : 'pointer')};
    color: ${props =>
      props.disabled ? `${colors.black}` : `${colors.secondary}`};
    background-color: ${props =>
      props.disabled ? `${colors.grey_light}` : `${colors.white_dark}`};
    box-shadow: #ffffff7f 0px 5px 15px;
  }
`;

const Tertiary = styled(ButtonBase)`
  color: ${colors.white};
  border: 1px solid ${colors.grey};
  background-color: ${colors.grey};
  box-shadow: rgba(255, 255, 255, 0.3) 0px 2px 10px;

  &:hover {
    cursor: ${props => (props.disabled ? '' : 'pointer')};
    color: ${props => (props.disabled ? 'white' : 'white')};
    background-color: ${props =>
      props.disabled ? `${colors.grey_light}` : `${colors.grey_light}`};
  }
`;

const Inline = styled.button`
  color: ${props => props.color || colors.black};
  background: none;
  font-size: ${props => props.fontSize || FontSizes.Regular};
  font-weight: ${props => props.fontWeight || 'Bold'};
  border: none;

  &:hover {
    cursor: ${props => (props.disabled ? '' : 'pointer')};
  }

  &:active {
    transform: scale(0.99);
  }
`;

export function Button({
  primary,
  secondary,
  tertiary,
  inline,
  fontSize,
  width,
  height,
  disabled,
  onClick,
  borderRadius,
  margin,
  showLoading,
  children,
  color,
}) {
  if (primary) {
    return (
      <Primary
        fontSize={fontSize}
        width={width}
        height={height}
        disabled={disabled}
        onClick={onClick}
        borderRadius={borderRadius}
        margin={margin}
      >
        {showLoading ? (
          <Loader
            backgroundColor={colors.Grey}
            spinnerColor={colors.white}
            size={30}
          />
        ) : (
          children
        )}
      </Primary>
    );
  }

  if (secondary) {
    return (
      <Secondary
        fontSize={fontSize}
        width={width}
        height={height}
        disabled={disabled}
        onClick={onClick}
        borderRadius={borderRadius}
        margin={margin}
      >
        {children}
      </Secondary>
    );
  }

  if (tertiary) {
    return (
      <Tertiary
        fontSize={fontSize}
        width={width}
        height={height}
        disabled={disabled}
        onClick={onClick}
        borderRadius={borderRadius}
        margin={margin}
      >
        {children}
      </Tertiary>
    );
  }

  if (inline) {
    return (
      <Inline
        fontSize={fontSize}
        width={width}
        height={height}
        disabled={disabled}
        onClick={onClick}
        color={color}
      >
        {children}
      </Inline>
    );
  }

  return <button type="button">{children}</button>;
}
