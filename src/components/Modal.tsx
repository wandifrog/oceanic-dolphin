import styled from '@emotion/styled';
import useTheme from 'hooks/Theme.hook';

type ModalProps = {
  children: React.ReactNode
  visible: boolean
}
type ContentProps = {
  backgroundColor: string
}

/**
 * Modal component.
 * @example
 * <Modal>
 *   <div>Hello</div>
 *   <div>wWrld</div>
 * </Modal>
 */
const Modal = ({
  children,
  visible = false
}: ModalProps): JSX.Element | null => {
  const colors = useTheme();

  return visible ? (
    <StyledContent backgroundColor={colors.backgroundSecondary}>
      {children}
    </StyledContent>
  ) : null;
};

const StyledContent = styled.div<ContentProps>`
  background-color: ${(props) => props.backgroundColor};
  height: auto;
  left: 62.5px;
  margin-top: 65px;
  padding: 10px;
  position: absolute;
  width: 250px;
  z-index: 10;
`;

export default Modal;
