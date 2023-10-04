import { fontFamily, fontSize } from 'constants/Fonts.constant';
import styled from '@emotion/styled';
import useTranslation from 'hooks/Translation.hook';
import HStack from 'components/HStack';
import Text from 'components/Text';
import useApp from 'hooks/App.hook';

const HomePage = (): JSX.Element => {
  const [state, dispatch] = useApp();
  const { t, language } = useTranslation();

  function _changeTheme() {
    dispatch({ type: 'CHANGE_THEME' });
  }

  function _changeLanguage() {
    dispatch({ type: 'CHANGE_LANGUAGE' });
  }

  function _goToCompany() {
    window.open('https://efishery.com/', '_blank');
  }

  function _goToGithub() {
    window.open('https://github.com/wandifrog', '_blank');
  }

  function _goToLinkedIn() {
    window.open('https://www.linkedin.com/in/wandi-wandi/', '_blank');
  }

  return (
    <>
      <Content>
        <Text top="60px" size={fontSize.normal} center
          onClick={() => _changeLanguage()}>
          {t.home.bilingualButton}
          <Text left="5px" size={fontSize.small} span font={fontFamily.pokemonSolid}>
            {language === 'id' ? 'English' : 'Bahasa'}
          </Text>
        </Text>
        <Text top="30px" size={fontSize.normal} center
          onClick={() => _changeTheme()}>
          {t.home.themeButton}
          <Text left="5px" size={fontSize.small} span font={fontFamily.pokemonSolid}>
            {state.darkMode ? t.home.lightTheme : t.home.darkTheme}
          </Text>
        </Text>
        <BottomInformation>
          <HStack bottom="5px" justify="center" align="center">
            <Text size={fontSize.small} onClick={() => _goToGithub()}>Github</Text>
            <Text right="4px" left="4px">|</Text>
            <Text size={fontSize.small} onClick={() => _goToLinkedIn()}>LinkedIn</Text>
          </HStack>
          <Text bold italic center onClick={() => _goToCompany()}>The Future is Aquaculture</Text>
        </BottomInformation>
      </Content>
    </>
  );
};

const Content = styled.div`
  height: calc(100% - 135px);
  padding-top: 50px;
  position: relative;
  width: 100%;
`;
const BottomInformation = styled.div`
  bottom: 20px;
  position: absolute;
  width: 100%;
`;

export default HomePage;
