import { React, Component } from 'react';

import { SearchBar } from '../Searchbar/Searchbar';
import { Container } from './App.styled';

// export const App = () => {
//   return (
//     <div>
//       <SearchBar onsubmit={onSubmit} />
//     </div>
//   );
// };

export class App extends Component {
  state = {
    valueImg: '',
  };
  render() {
    return (
      <Container>
        <SearchBar />
      </Container>
    );
  }
}
