import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddFishPage from 'pages/AddFish.page';
import FishCataloguePage from 'pages/FishCatalogue.page';
import HomePage from 'pages/Home.page';
import styled from '@emotion/styled';
import PBottomNavigation from 'components/PBottomNavigation';
import PFancyHeader from 'components/PFancyHeader';
import useTheme from 'hooks/Theme.hook';

type ContainerProps = {
  background: string
}

const AppRoutes = (): JSX.Element => {
  const colors = useTheme();

  return (
    <Router>
      <Container background={colors.background}>
        <PFancyHeader />
        <Switch>
          <Route path="/add-fish">
            <AddFishPage />
          </Route>
          <Route path="/fish-catalogue" exact>
            <FishCataloguePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <PBottomNavigation />
      </Container>
    </Router>
  );
};

const Container = styled.div<ContainerProps>`
  margin: 0 auto;
  position: relative;
  background-color: ${(props) => props.background};
  width: 375px;
  height: 100vh;
  @media (max-width: 375px) {
    width: 100%;
  }
`;

export default AppRoutes;
