import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Loader(){
    return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <CircularProgress />
      </div>
    );
}