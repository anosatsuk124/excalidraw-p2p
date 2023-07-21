import { LICENSE_TEXT } from '@/constants';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import licenses from '@/assets/licenses.json';
import { Licenses } from '@/types/license';

export const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelfLicense = () => {
  return (
    <Paper
      variant="outlined"
      sx={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}
    >
      <Typography>{LICENSE_TEXT}</Typography>
    </Paper>
  );
};

const ExternalLicensesTable = () => {
  const props = Licenses.parse(licenses);

  return (
    <TableContainer component={Paper} sx={{ textAlign: 'center' }}>
      <Typography>Used Assets</Typography>
      <Table size="small" aria-label="Used Assets">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">License Type</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Installed from</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.licenseType}</TableCell>
              <TableCell align="right">{row.author}</TableCell>
              <TableCell align="right">{row.link}</TableCell>
              <TableCell align="right">{row.installedFrom}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const LicensePage = () => {
  return (
    <Main>
      <SelfLicense />
      <ExternalLicensesTable />
    </Main>
  );
};

export default LicensePage;
