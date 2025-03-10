import './Spinner.css'
interface SpinnerProps {
    width: number;
    height: number;
    borderWidth: number;
}
const Spinner = (props: SpinnerProps) => {
    const { width, height, borderWidth } = props;
    return (
        <div className='spinner' style={{ width: width, height: height, borderWidth: borderWidth }}></div>
    )
}

export default Spinner