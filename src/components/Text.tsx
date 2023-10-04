import { fontSize } from 'constants/Fonts.constant';
import { ComponentMetrics } from 'types/Component';
import { createElement } from 'react';
import CSS from 'csstype';
import useTheme from 'hooks/Theme.hook';

type TextProps = ComponentMetrics & React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode | string
  /**
   * Font weight
   */
  bold?: boolean
  /**
   * Text align center
   */
  center?: boolean
  /**
   * onClick event
   */
  onClick?: () => void
  /**
   * Font family
   */
  font?: string
  /**
   * Font style italic
   */
  italic?: boolean
  /**
   * Font size
   */
  size?: CSS.Property.FontSize
  /**
   * Span element
   */
  span?: boolean
}

/**
 * Text component.
 * @example
 * <Text>Hello world</Text>
 * <Text top="5px">Nakama</Text>
 * <Text size="14px" color="cadetblue" center>Hello World</Text>
 */
const Text = ({
  children,
  top,
  right,
  bottom,
  left,
  bold = false,
  center = false,
  color,
  font,
  italic = false,
  onClick,
  size = fontSize.normal,
  span = false,
  ...props
}: TextProps): JSX.Element => {
  const colors = useTheme();

  const styText: React.CSSProperties = {
    color: color || colors.text,
    cursor: onClick ? 'pointer' : undefined,
    fontSize: size,
    fontFamily: font,
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: bold ? 'bold' : 'normal',
    textAlign: center ? 'center' : undefined,
    marginTop: top,
    marginRight: right,
    marginBottom: bottom,
    marginLeft: left,
    userSelect: onClick ? 'none' : 'initial'
  };

  return createElement(
    span ? 'span' : 'div',
    {
      style: styText,
      onClick: () => onClick && onClick(),
      ...props
    },
    children
  );

  // return span === true // longer code
  //   ? <span style={styText} onClick={() => onClick && onClick()} {...props}>{children}</span>
  //   : <div style={styText} onClick={() => onClick && onClick()} {...props}>{children}</div>
};

export default Text;
