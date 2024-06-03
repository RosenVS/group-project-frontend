import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({isLoading}) => {
    const loaderProps = {
        loading: isLoading,
        size: 40,
        duration: 2,
        colors: ['#000', '#000'],
    };
    return (<CircularProgress {...loaderProps} />)
}
export default Loader;
