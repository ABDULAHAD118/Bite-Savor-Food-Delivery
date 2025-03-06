import { SpinnerProps } from '../../Types';
import './Spinner.css'

const Spinner = (props: SpinnerProps) => {
    const { width, height, borderWidth } = props;
    return (
        <div className='spinner' style={{ width: width, height: height, borderWidth: borderWidth }}></div>
    )
}

export default Spinner