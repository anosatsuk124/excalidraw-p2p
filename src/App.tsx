import styled from 'styled-components';
import ExcalidrawMain from '@/Components/Excalidraw';

export const Main = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

function App() {
  return (
    <Main>
      <ExcalidrawMain />
    </Main>
  );
}

export default App;
